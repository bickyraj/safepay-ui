import {Component, inject, OnInit} from '@angular/core';
import {isCollapsed} from '../../shared/state/sidebar-toggle.state';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {
  private router: Router = inject(Router);
  public title: string = "App";

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.title = url.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? "";
      });
  }
  protected readonly isCollapsed = isCollapsed;
}
