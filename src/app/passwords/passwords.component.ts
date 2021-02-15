import { Component } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent {
  token = this.loginService.getToken();
  passwords = [];
  constructor(private loginService: LoginService) {}
}
