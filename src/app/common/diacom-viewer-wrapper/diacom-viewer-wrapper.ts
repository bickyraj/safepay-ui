import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'app-dicom-viewer-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div #host></div>
  `,
})
export class DicomViewerWrapper implements OnInit, OnChanges, OnDestroy {
  @Input() imageUrls: string[] = [];
  @Input() width = '512px';
  @Input() height = '512px';

  @ViewChild('host', { static: true }) hostRef!: ElementRef<HTMLDivElement>;

  private viewerEl?: HTMLElement;
  private scriptLoaded = false;

  private onRendered = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('[dicom-viewer] rendered', detail);
  };

  private onError = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.error('[dicom-viewer] error', detail);
  };

  async ngOnInit(): Promise<void> {
    await this.loadScriptOnce();
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrls'] && this.viewerEl) {
      this.viewerEl.setAttribute('image-urls', JSON.stringify(this.imageUrls));
    }
  }

  private loadScriptOnce(): Promise<void> {
    if (this.scriptLoaded || customElements.get('dicom-viewer')) {
      this.scriptLoaded = true;
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/dicom-viewer/dicom-viewer-element.js';
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load dicom-viewer-element.js'));
      document.head.appendChild(script);
    });
  }

  private createElement(): void {
    this.viewerEl = document.createElement('dicom-viewer');
    this.viewerEl.setAttribute('width', this.width);
    this.viewerEl.setAttribute('height', this.height);
    this.viewerEl.setAttribute('image-urls', JSON.stringify(this.imageUrls));

    this.viewerEl.addEventListener('viewer-rendered', this.onRendered);
    this.viewerEl.addEventListener('viewer-error', this.onError);

    this.hostRef.nativeElement.appendChild(this.viewerEl);
  }

  ngOnDestroy(): void {
    this.viewerEl?.removeEventListener('viewer-rendered', this.onRendered);
    this.viewerEl?.removeEventListener('viewer-error', this.onError);
    this.viewerEl?.remove();
  }
}
