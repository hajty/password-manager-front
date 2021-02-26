import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { Password } from 'src/app/_models/shared/password.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {
  showPassword = false;
  token = this.loginService.getToken();
  passwords: Password[] = [];
  counter = 0;
  fetched = false;
  constructor(
      private loginService: LoginService,
      private passwordsService: PasswordsService,
      private route: Router) {}

  ngOnInit(): void {
    if (this.token != null) {
      this.passwordsService.getPasswords(this.token).subscribe(
          data => {
            this.passwords = data;
            this.fetched = true;
          }
      );
    }
    else {
      this.route.navigate(['/login']).then();
    }
  }
  onClickEye(): void {
    this.showPassword = !this.showPassword;
  }
  onClickClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

