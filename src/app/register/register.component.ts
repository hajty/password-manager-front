import { Component } from '@angular/core';
import { User } from '../users/shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor() { }
  model = { email: '', password: '', confirmPassword: '' };
  registrationResult = null;
  onSubmit(): void {
    const email = this.model.email.trim();
    const password = this.model.password.trim();
    const user = new User(email, password);
  }
}
