import { Component, Inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.document.body.classList.toggle('show-sidebar');
  }

  get user() {
    if (this.authService.user) {
      return this.authService.user;
    }
    return 'Admin';
  }
}
