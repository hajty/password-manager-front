import { Component } from '@angular/core';
import { User } from '../users/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() { }
  model = { email: '', password: '' };

  public onSubmit(): void {
    const email = this.model.email.trim();
    const password = this.model.password.trim();
    const user = new User(email, password);
  }
}
