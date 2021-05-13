import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { IPassword } from 'src/app/_models/shared/password.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {
  token = this.loginService.getToken();
  passwords: IPassword[] = [];
  fetched = false;
  newPassword: IPassword = {
    service: '',
    username: '',
    password: ''
  };
  constructor(
      private modalService: NgbModal,
      private loginService: LoginService,
      private passwordsService: PasswordsService,
      private route: Router) {}

  ngOnInit(): void {
    this.passwords = [];
    this.fetched = false;
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
  onClickAdd(newPasswordModal: TemplateRef<NgbModal>): void {
    this.modalService.open(newPasswordModal, { centered: true })
        .result.then((result) => {
          if (result === 'save') {
            this.passwordsService.postPassword(this.token, this.newPassword).subscribe(
                response => {
                  if ((response as HttpResponse<any>).status === 201) {
                    this.newPassword = {
                      service: '',
                      username: '',
                      password: ''
                    };
                    this.ngOnInit();
                    alert('Successfully added new password!');
                  }
                }
            );
          }
        },
        () => {
          this.newPassword = {
            service: '',
            username: '',
            password: ''
          };
        });
  }
  onClickSave(password: IPassword): void {
    const passwordToEdit = this.passwords.find(element => element._id === password._id);
    passwordToEdit._isEdited = false;
  }

  onClickDelete(password: IPassword): void {
    this.passwordsService.deletePassword(this.token, password).subscribe(
        response => {
          if ((response as HttpResponse<any>).status === 204) {
            alert('Successfully deleted password!');
            this.ngOnInit();
          }
        }
    );
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

