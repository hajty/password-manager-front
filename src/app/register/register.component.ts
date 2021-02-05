import { Component } from '@angular/core';

import { User } from '../users/shared/user.model';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ LoginService ]
})
export class RegisterComponent {
  constructor(private loginService: LoginService) { }
  model = { email: '', password: '', confirmPassword: '' };
  registrationResult = null;
  onSubmit(): void {
    const email = this.model.email.trim();
    const password = this.model.password.trim();
    const user = new User(email, password);
    this.loginService.register(user).subscribe((addedUser: User) => {
      if (addedUser != null) { console.log(`Added user id: ${addedUser.id}`); }
      else { console.log(`nope`); }
    });
  }
}
