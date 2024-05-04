import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  get isAuthenticated(): boolean {
    if (window.localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  get checkAuthentication(): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  saveLogin(token: string): void {
    window.localStorage.setItem('token', token);
    this.router.navigate(['']);
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  login(username: string, password: string) {
    return this.http.post('https://fakestoreapi.com/auth/login', {
      username,
      password,
    });
  }
}
