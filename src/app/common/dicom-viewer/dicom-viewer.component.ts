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
  init as coreInit, metaData,
} from '@cornerstonejs/core';

import cornerstoneDICOMImageLoader, { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';

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

  private _imageIds: string[] = [];

  private viewportId = 'CT_AXIAL_STACK';
  private viewportCreated = false;

  @Input()
  set imageIds(value: string[]) {
    this._imageIds = value;

    // ONLY update stack, do NOT recreate viewport
    this.trySetStack();
  }

  get imageIds() {
    return this._imageIds;
  }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  async init(): Promise<void> {
    await coreInit();

    this.renderingEngine = new RenderingEngine(this.renderingEngineId);

    await dicomImageLoaderInit();

    this.createViewPort();
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

  private async trySetStack(): Promise<void> {
    if (!this.viewportCreated) return;
    if (!this._imageIds?.length) return;

    const viewport = this.renderingEngine.getViewport(
      this.viewportId
    ) as any;

    if (!viewport) return;
    try {
      const validStack: string[] = [];

      for (let i = 0; i < this.imageIds.length; i++) {
        try {
          console.log(`🔄 Preloading ${i}`);

          await cornerstoneDICOMImageLoader.wadouri.loadImage(this.imageIds[i]);

          validStack.push(this.imageIds[i]);

          console.log(`✅ OK ${i}`);
        } catch (err) {
          console.error(`❌ Skipping broken image ${i}`, this.imageIds[i]);
        }
      }
      // 2. Preload images one-by-one (IMPORTANT)
      await viewport.setStack(validStack, 0);
      console.log('test');
      viewport.render();
    } catch (error) {
      console.log('the error is here');
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.renderingEngine?.destroy();
  }
}
