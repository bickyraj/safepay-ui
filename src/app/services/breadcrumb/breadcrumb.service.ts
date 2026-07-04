import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {

  breadcrumbs: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.route.root);
      });
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url: nextUrl });
      }

      this.buildBreadCrumb(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
