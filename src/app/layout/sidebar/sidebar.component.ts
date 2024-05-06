import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  toggleSidebar() {
    this.document.body.classList.toggle('show-sidebar');
  }
}
