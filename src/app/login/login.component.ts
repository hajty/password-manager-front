import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../users/shared/user.model';
import { LoginService } from 'src/app/_services/login.service';
import { Token } from 'src/app/users/shared/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  model = { email: '', password: '' };
  loginResult = null;
  constructor(private router: Router, private loginService: LoginService) {}
  onSubmit(): void {
    const email = this.model.email.trim();
    const password = this.model.password.trim();
    const user = new User(email, password);
    this.loginService.login(user).subscribe(resp => {
      if (resp.status === 200) {
        const token = new Token(resp.body.accessToken, resp.body.expiresIn);
        this.loginService.setToken(token);
        this.router.navigate(['/passwords']).then();
      }
    }, error => {
      if (error.status === 400) {
        console.log(400);
      }
      if (error.status === 401) {
        console.log(401);
      }
    });
  }
}
