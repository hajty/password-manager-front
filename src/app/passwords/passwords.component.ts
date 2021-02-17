import { Component, destroyPlatform, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { Password } from 'src/app/users/shared/password.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {
  token = this.loginService.getToken();
  passwords: Password[] = [];
  constructor(
      private loginService: LoginService,
      private passwordsService: PasswordsService,
      private route: Router) {}

  ngOnInit(): void {
    if (this.token != null) {
      this.passwordsService.getPasswords(this.token).subscribe(
          data => {
            for (const password of data) {
              this.passwords.push(password);
            }
          }
      );
    }
    else {
      this.route.navigate(['/login']).then();
    }
  }
}
