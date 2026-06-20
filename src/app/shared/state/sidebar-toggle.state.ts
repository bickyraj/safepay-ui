import { signal } from '@angular/core';

export const isCollapsed = signal<boolean>(false);

export function toggleSidebar() {
  isCollapsed.update(value => !value);
}
