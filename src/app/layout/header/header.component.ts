import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import Keycloak from 'keycloak-js';
import {ResizeService} from '../../services/resize.service';
import {AuthService} from '../../services/auth/auth.service';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    HasRolesDirective
  ],
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {

  private readonly AuthService = inject(AuthService);

  public readonly userName: string = this.AuthService.getUserName();
  public readonly businessName: string = this.AuthService.getBusinessName();

  @ViewChild("headerRef", {static: false}) headerRef!: ElementRef;

  private _resizeService = inject(ResizeService);
  private _keycloak: Keycloak = inject(Keycloak);

  ngAfterViewInit(): void {
    this._resizeService.sidebarSizeSubject.subscribe({
      next: size => {
        if (!size) return;
        const width = document.documentElement.clientWidth - size.width;
        this.headerRef.nativeElement.style.width = `${width}px`;
      }
    })
  }
  public async logout(): Promise<void> {
    await this._keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}
