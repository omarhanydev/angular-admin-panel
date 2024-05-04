import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
    if (authService.isAuthenticated) {
      this.router.navigate(['']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['mor_2314', Validators.required],
      password: ['83r5^_', Validators.required],
    });
  }

  get username(): FormControl {
    return <FormControl<any>>this.loginForm.get('username');
  }

  get password(): FormControl {
    return <FormControl<any>>this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.username?.value;
      const password = this.password?.value;
      this.authService.login(username, password).subscribe({
        next: ({ token }: any) => {
          this.authService.saveLogin(token);
        },
        error: (response: HttpErrorResponse) => {
          const message = response.error
            ? String(response.error).charAt(0).toUpperCase() +
              String(response.error).slice(1)
            : null;
          if (message) {
            this._snackBar.open(message, '', {
              duration: 1200,
            });
          }
        },
      });
    }
  }
}
