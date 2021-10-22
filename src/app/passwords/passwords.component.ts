import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { IPassword } from 'src/app/_models/shared/password.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StoragePasswordComponent } from 'src/app/storage-password/storage-password.component';
import { EditPasswordComponent } from 'src/app/edit-password/edit-password.component';
import { CounterComponent } from 'src/app/counter/counter.component';
import { ToastService } from 'src/app/_services/toast.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
    selector: 'app-passwords',
    templateUrl: './passwords.component.html',
    styleUrls: ['./passwords.component.css'],
})
export class PasswordsComponent implements OnInit, AfterViewInit, AfterViewChecked {
    @ViewChild(CounterComponent) counterComponent;
    @ViewChild(StoragePasswordComponent) storagePasswordComponent;
    @ViewChild(EditPasswordComponent) editPasswordComponent;
    @ViewChild('passwordModal') passwordModal: HTMLElement;

    token = this.loginService.getToken();
    passwords: IPassword[] = [];
    fetched = false;
    storagePasswordEntered = false;
    constructor(
        private modalService: NgbModal,
        private loginService: LoginService,
        private passwordsService: PasswordsService,
        private toastService: ToastService,
        private route: Router,
        private cryptoService: CryptoService
    ) {}

    ngOnInit(): void {
        this.passwords = [];
        this.fetched = false;

        if (this.token != null) {
            this.passwordsService.getPasswords(this.token).subscribe((data) => {
                for (const password of data) {
                    this.passwords.push(password);
                }
                this.fetched = true;
                this.counterComponent.setTimer();
            });
        }
    }

    ngAfterViewInit(): void {}

    ngAfterViewChecked(): void {
        if (this.token == null) {
            this.route.navigate(['/logout']).then();
        }
    }

    onClickLogout(): void {
        this.token = null;
        this.toastService.showRed({
            header: 'Logged out',
            body: 'You have logged out!',
        });
    }

    onClickAdd(): void {
        this.editPasswordComponent.modalType = 'add';
        this.modalService
            .open(this.editPasswordComponent.editModal, { centered: true })
            .result.then(
                (result) => {
                    if (result === 'save') {
                        this.passwordsService
                            .postPassword(this.token, this.editPasswordComponent.editPassword)
                            .subscribe((response) => {
                                if ((response as HttpResponse<any>).status === 201) {
                                    this.editPasswordComponent.clearPassword();
                                    this.counterComponent.refreshToken();
                                    this.ngOnInit();
                                    this.toastService.showGreen({
                                        header: 'Added new Password',
                                        body: 'Successfully added new Password!',
                                    });
                                }
                            });
                    }
                },
                () => {
                    this.editPasswordComponent.clearPassword();
                }
            );
    }

    onClickEdit(password: IPassword): void {
        this.editPasswordComponent.modalType = 'edit';
        this.editPasswordComponent.editPassword._id = password._id;
        this.editPasswordComponent.editPassword.service = password.service;
        this.editPasswordComponent.editPassword.username = password.username;
        this.editPasswordComponent.editPassword.password = password.password;

        this.modalService
            .open(this.editPasswordComponent.editModal, { centered: true })
            .result.then(
                (result) => {
                    if (result === 'save') {
                        this.passwordsService
                            .updatePassword(this.token, this.editPasswordComponent.editPassword)
                            .subscribe((response) => {
                                if ((response as HttpResponse<any>).status === 204) {
                                    this.editPasswordComponent.clearPassword();
                                    this.counterComponent.refreshToken();
                                    this.ngOnInit();
                                    this.toastService.showYellow({
                                        header: 'Updated new Password',
                                        body: 'Successfully updated new Password!',
                                    });
                                }
                            });
                        this.editPasswordComponent.clearPassword();
                    }
                },
                () => {
                    this.editPasswordComponent.clearPassword();
                }
            );
    }

    onClickDelete(password: IPassword): void {
        this.passwordsService.deletePassword(this.token, password).subscribe((response) => {
            if ((response as HttpResponse<any>).status === 204) {
                this.toastService.showRed({
                    header: 'Deleted Password',
                    body: 'Successfully deleted Password!',
                });
                this.counterComponent.refreshToken();
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
