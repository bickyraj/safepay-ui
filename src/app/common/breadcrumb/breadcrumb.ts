import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    RouterLink
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  standalone: true
})
export class Breadcrumb {
  public breadcrumbService = inject(BreadcrumbService);
}
