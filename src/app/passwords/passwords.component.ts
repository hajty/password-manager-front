import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { IPassword } from 'src/app/_models/shared/password.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CountdownService } from 'src/app/_services/countdown.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit, AfterViewChecked {
    private counter: Subscription;

    @ViewChild('passwordModal') passwordModal: HTMLElement;
    modalType = '';
    timerText = '';

    token = this.loginService.getToken();
    passwords: IPassword[] = [];
    fetched = false;
    editPassword: IPassword = {
        service: '',
        username: '',
        password: ''
    };
    constructor(
        private modalService: NgbModal,
        private loginService: LoginService,
        private passwordsService: PasswordsService,
        private countDownService: CountdownService,
        private route: Router) {}

    private clearPassword(): void {
        this.editPassword = {
          service: '',
          username: '',
          password: ''
        };
    }

    private refreshToken(): void {
        this.loginService.refreshToken(this.token).subscribe(token => this.token = token);
        this.setTimer();
    }

    private setTimer(): void {
        if (this.counter != null) { this.counter.unsubscribe(); }
        this.counter = this.countDownService.countdown(this.token.expiresIn, 'mm:ss').subscribe(
            x => this.timerText = x,
            () => {},
            () => {
                this.token = null;
            });
    }

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
                    this.setTimer();
              }
            );
        }
    }

    ngAfterViewChecked(): void {
        if (this.token == null) { this.route.navigate(['/logout']).then(); }
    }

    onClickRefresh(): void {
        this.refreshToken();
    }

    onClickLogout(): void {
        this.token = null;
    }

    onClickAdd(): void {
        this.modalType = 'add';
        this.modalService.open(this.passwordModal, { centered: true })
            .result.then((result) => {
              if (result === 'save') {
                this.passwordsService.postPassword(this.token, this.editPassword).subscribe(
                    response => {
                      if ((response as HttpResponse<any>).status === 201) {
                        this.clearPassword();
                        this.refreshToken();
                        this.ngOnInit();
                        alert('Successfully added new password!');
                      }
                    }
                );
              }
            },
            () => {
              this.clearPassword();
            });
    }

    onClickEdit(password: IPassword): void {
        this.modalType = 'edit';
        this.editPassword._id = password._id;
        this.editPassword.service = password.service;
        this.editPassword.username = password.username;
        this.editPassword.password = password.password;

        this.modalService.open(this.passwordModal, { centered: true })
            .result.then((result) => {
              if (result === 'save') {
                this.passwordsService.updatePassword(this.token, this.editPassword).subscribe(
                    response => {
                      if ((response as HttpResponse<any>).status === 204) {
                        this.clearPassword();
                        this.refreshToken();
                        this.ngOnInit();
                        alert('Successfully updated new password!');
                      }
                    }
                );
                this.clearPassword();
              }
            },
            () => {
              this.clearPassword();
            });
    }

    onClickDelete(password: IPassword): void {
        this.passwordsService.deletePassword(this.token, password).subscribe(
            response => {
              if ((response as HttpResponse<any>).status === 204) {
                alert('Successfully deleted password!');
                this.refreshToken();
                this.ngOnInit();
              }
            });
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

