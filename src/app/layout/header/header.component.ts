import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
  ) {}

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.layoutService.toggle();
  }

  get user() {
    if (this.authService.user) {
      return this.authService.user;
    }
    return 'Admin';
  }
}
