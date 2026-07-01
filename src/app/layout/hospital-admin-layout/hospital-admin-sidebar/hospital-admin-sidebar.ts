import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ResizeService} from '../../../services/resize.service';
import {StorageService} from '../../../services/storage/storage.service';
import {GlobalStorage} from '../../../services/storage/GlobalStorage.enum';
import {isCollapsed, toggleSidebar} from '../../../shared/state/sidebar-toggle.state';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {HospitalSidebarMenu} from '../hospital-sidebar-menu/hospital-sidebar-menu';

@Component({
  selector: 'app-hospital-admin-sidebar',
  imports: [
    NgClass,
    HospitalSidebarMenu,
    NgOptimizedImage
  ],
  templateUrl: './hospital-admin-sidebar.html',
  styleUrl: './hospital-admin-sidebar.scss',
  standalone: true
})
export class HospitalAdminSidebar implements AfterViewInit {
  @ViewChild("sidebarRef", {static: false}) sidebarRef!: ElementRef;
  @ViewChild('fixedDivRef', { static: false }) fixedDivRef!: ElementRef;

  private _resizeSizeService = inject(ResizeService);

  private _resizeObserver!: ResizeObserver;

  protected readonly isCollapsed = isCollapsed;
  globalStorage = inject(StorageService);

  constructor(private _renderer: Renderer2, private _changeDetectorRef: ChangeDetectorRef) {
    const globalToggle = this.globalStorage.get<boolean>(GlobalStorage.SIDEBAR_TOGGLE);
    if (globalToggle) {
      isCollapsed.set(globalToggle.value);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this._setFixedDivWidth();
  }

  ngAfterViewInit(): void {
    this._setFixedDivWidth();
    this._resizeObserver = new ResizeObserver(() => {
      this._setFixedDivWidth();
      this._changeDetectorRef.detectChanges();
    });

    this._resizeObserver.observe(this.sidebarRef.nativeElement);
  }

  private _setFixedDivWidth() {
    const width = this.sidebarRef.nativeElement.offsetWidth;
    this._resizeSizeService.updateSidebarSize({width, height: this.sidebarRef.nativeElement.offsetHeight });
    this._renderer.setStyle(this.fixedDivRef.nativeElement, 'width', `${width}px`);
  }

  public setToggleState(): void {
    toggleSidebar();
    this.globalStorage.set<boolean>(GlobalStorage.SIDEBAR_TOGGLE, isCollapsed());
  }
}
