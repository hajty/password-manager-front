import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, timer } from 'rxjs';

import { User } from '../_models/shared/user.model';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ LoginService ]
})

export class RegisterComponent {
  model = { oldEmail: '', email: '', password: '', confirmPassword: '' };
  registrationResult = null;
  timeToRedirect = 5;
  constructor(private router: Router, private loginService: LoginService) {}
  private clearEmail(): void {
    this.model.oldEmail = this.model.email;
    this.model.email = '';
  }
  onSubmit(): void {
    const user: User = {
      email: this.model.email.trim(),
      password: this.model.password.trim()
    };
    this.loginService.register(user).subscribe(resp => {
      if (resp.status === 201) {
        this.registrationResult = 'success';
        timer(5000).subscribe(() => { this.router.navigate(['/login']).then(); });
        interval(1000).subscribe(() => { this.timeToRedirect--; });
      }
    }, error => {
      if (error.status === 409 && error.error === 'User already exists') {
        this.registrationResult = 'user exists';
        this.clearEmail();
      }
      if (error.status === 400 && error.error === 'Wrong body format') { this.registrationResult = 'wrong body format'; }
    });
  }
}
