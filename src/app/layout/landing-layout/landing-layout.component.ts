import {AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {isCollapsed} from '../../shared/state/sidebar-toggle.state';
import Keycloak from 'keycloak-js';
import {NgClass} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  templateUrl: './landing-layout.component.html',
  imports: [
    NgClass,
    RouterOutlet
  ],
  styleUrl: './landing-layout.component.css'
})
export class LandingLayoutComponent implements AfterViewInit {
  private readonly _keycloak = inject(Keycloak);
  ngAfterViewInit(): void {
      this.onScroll();
  }
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  menuTextColor: string = 'text-white';

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.menu) return;

    const menuRect = this.menu.nativeElement.getBoundingClientRect();
    const sections = document.querySelectorAll<HTMLElement>('section'); // select only relevant sections

    let foundLight = false;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (menuRect.top < rect.bottom && menuRect.bottom > rect.top) {
        const bgColor = getComputedStyle(section).backgroundColor; // e.g., "rgb(240, 240, 240)"
        if (this.isLightColor(bgColor)) {
          foundLight = true;
        }
      }
    });

    this.menuTextColor = foundLight ? 'text-gray-950' : 'text-white';
  }

  // Utility to check if a color is light
  public isLightColor(rgb: string): boolean {
    const match = rgb.match(/\d+/g);
    if (!match) return false;

    const r = parseInt(match[0], 10);
    const g = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);

    // Perceived brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200; // threshold for "light" background
  }

  public login(): void {
    this._keycloak.login({
      redirectUri: window.location.origin + '/dashboard'
    });
  }
}
