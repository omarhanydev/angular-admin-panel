import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
}
