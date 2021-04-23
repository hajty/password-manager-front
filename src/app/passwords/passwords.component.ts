import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { IPassword } from 'src/app/_models/shared/password.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {
  token = this.loginService.getToken();
  passwords: IPassword[] = [];
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
            for (const password of data) {
              this.passwords.push(password);
            }
            this.fetched = true;
          }
      );
    }
    else {
      this.route.navigate(['/login']).then();
    }
  }
  onClickEdit(password: IPassword): void {
    const modal = document.getElementById('modalEdit');
    const closeButton = document.getElementById('buttonClose');
    const editService = document.getElementById('editService');
    const editUsername = document.getElementById('editUsername');
    const editPassword = document.getElementById('editPassword');

    (editService as HTMLInputElement).value = password.service;
    (editUsername as HTMLInputElement).value = password.username;
    (editPassword as HTMLInputElement).value = password.password;
    modal.style.display = 'block';

    closeButton.onclick = () => {
      modal.style.display = 'none';
    };
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

