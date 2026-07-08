import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  RenderingEngine,
  Enums,
  Types,
  imageLoader,
  init as coreInit,
} from '@cornerstonejs/core';

import {
  init as dicomImageLoaderInit,
  wadouri,
} from '@cornerstonejs/dicom-image-loader';

import {
  init as cornerstoneToolsInit,
  addTool,
  ToolGroupManager,
  WindowLevelTool,
  ZoomTool,
  PanTool,
  StackScrollTool,
  Enums as csToolsEnums,
} from '@cornerstonejs/tools';

const { MouseBindings } = csToolsEnums;

/**
 * Races a promise against a timeout so we can tell the difference between
 * "still loading" and "silently stuck forever" (e.g. a web worker/codec
 * that never resolves).
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`TIMEOUT: ${label} took longer than ${ms}ms`)), ms)
    ),
  ]);
}

@Component({
  selector: 'app-dicom-viewer',
  standalone: true,
  template: `<div #el class="viewer"></div>`,
  styles: [`
    .viewer {
      width: 512px;
      height: 512px;
      background: black;
    }
  `],
})
export class DicomViewer implements OnInit, OnDestroy {

  public readonly renderingEngineId = 'myRenderingEngine';
  public renderingEngine!: RenderingEngine;

  @ViewChild('el', { static: true })
  elementRef!: ElementRef<HTMLDivElement>;

  // Plain HTTP URLs to .dcm files, NOT "wadouri:" prefixed
  private _imageUrls: string[] = [];

  private viewportId = 'CT_AXIAL_STACK';
  private toolGroupId = 'CT_TOOL_GROUP';
  private viewportCreated = false;
  private toolsInitialized = false;

  @Input()
  set imageIds(value: string[]) {
    this._imageUrls = value ?? [];
    // ONLY update stack, do NOT recreate viewport
    this.trySetStack();
  }

  get imageIds(): string[] {
    return this._imageUrls;
  }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  async init(): Promise<void> {
    await coreInit();

    // Explicit worker config + log so we can see if init actually completes
    await dicomImageLoaderInit({
      maxWebWorkers: navigator.hardwareConcurrency || 1,
    });
    console.log('✅ DICOM image loader initialized');

    await cornerstoneToolsInit();

    this.renderingEngine = new RenderingEngine(this.renderingEngineId);

    // Prevent the browser's right-click menu from blocking the Zoom tool
    this.elementRef.nativeElement.oncontextmenu = (e) => e.preventDefault();

    this.createViewPort();
    this.setupTools();
  }

  private createViewPort(): void {
    const viewportInput = {
      viewportId: this.viewportId,
      type: Enums.ViewportType.STACK,
      element: this.elementRef.nativeElement,
    };

    this.renderingEngine.enableElement(viewportInput);

    this.viewportCreated = true;

    this.trySetStack();
  }

  private setupTools(): void {
    if (this.toolsInitialized) return;

    addTool(WindowLevelTool);
    addTool(ZoomTool);
    addTool(PanTool);
    addTool(StackScrollTool);

    const toolGroup = ToolGroupManager.createToolGroup(this.toolGroupId);
    if (!toolGroup) return;

    toolGroup.addTool(WindowLevelTool.toolName);
    toolGroup.addTool(ZoomTool.toolName);
    toolGroup.addTool(PanTool.toolName);
    toolGroup.addTool(StackScrollTool.toolName);

    // Left click drag -> window/level (brightness/contrast)
    toolGroup.setToolActive(WindowLevelTool.toolName, {
      bindings: [{ mouseButton: MouseBindings.Primary }],
    });

    // Middle click drag -> pan
    toolGroup.setToolActive(PanTool.toolName, {
      bindings: [{ mouseButton: MouseBindings.Auxiliary }],
    });

    // Right click drag -> zoom
    toolGroup.setToolActive(ZoomTool.toolName, {
      bindings: [{ mouseButton: MouseBindings.Secondary }],
    });

    // Mouse wheel -> scroll through stack slices
    toolGroup.setToolActive(StackScrollTool.toolName);

    toolGroup.addViewport(this.viewportId, this.renderingEngineId);

    this.toolsInitialized = true;
  }

  /**
   * Fetches the raw DICOM bytes from a URL ourselves, wraps them in a File,
   * and registers that File with the wadouri file manager to get an imageId.
   */
  private async createImageIdFromUrl(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch DICOM file: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');
    console.log(`Content-Type for ${url}:`, contentType);

    const arrayBuffer = await response.arrayBuffer();
    console.log(`Fetched ${arrayBuffer.byteLength} bytes for ${url}`);

    const blob = new Blob([arrayBuffer], { type: 'application/dicom' });
    const file = new File([blob], 'image.dcm', { type: 'application/dicom' });

    // Returns an imageId like "dicomfile:0"
    const imageId = wadouri.fileManager.add(file);

    return imageId;
  }

  private async trySetStack(): Promise<void> {
    if (!this.viewportCreated) return;
    if (!this._imageUrls?.length) return;

    const viewport = this.renderingEngine.getViewport(
      this.viewportId
    ) as Types.IStackViewport;

    if (!viewport) return;

    try {
      const validStack: string[] = [];

      for (let i = 0; i < this._imageUrls.length; i++) {
        const url = this._imageUrls[i];
        try {
          console.log(`🔄 Fetching ${i}: ${url}`);
          const imageId = await this.createImageIdFromUrl(url);
          console.log(`📦 Got imageId ${i}: ${imageId}, now decoding...`);

          // Wrapped with a timeout — if this rejects with a TIMEOUT error,
          // the decode/worker step is stuck, not just slow.
          await withTimeout(
            imageLoader.loadAndCacheImage(imageId),
            10000,
            `loadAndCacheImage for ${imageId}`
          );

          validStack.push(imageId);
          console.log(`✅ OK ${i} -> ${imageId}`);
        } catch (err) {
          console.error(`❌ Failed to load image ${i}`, url, err);
        }
      }

      if (!validStack.length) {
        console.error('No valid images to display — check server response / CORS / Content-Type / codec support.');
        return;
      }

      await viewport.setStack(validStack, 0);
      viewport.render();
      console.log('✅ Stack rendered');
    } catch (error) {
      console.error('setStack/render failed', error);
    }
  }

  ngOnDestroy(): void {
    ToolGroupManager.destroyToolGroup(this.toolGroupId);
    this.renderingEngine?.destroy();
  }
}
