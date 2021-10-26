import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { PasswordsService } from 'src/app/_services/passwords.service';
import { Router } from '@angular/router';
import { IPassword } from 'src/app/_models/shared/password.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
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
    @ViewChild(EditPasswordComponent) editPasswordComponent;
    @ViewChild('passwordModal') passwordModal: HTMLElement;

    token = this.loginService.getToken();
    encryptedPasswords: IPassword[] = [];
    passwords: IPassword[] = [];
    fetched = false;
    storagePasswordEntered = false;
    newUser;

    constructor(
        private modalService: NgbModal,
        private loginService: LoginService,
        private passwordsService: PasswordsService,
        private toastService: ToastService,
        private route: Router,
        private cryptoService: CryptoService
    ) {}

    async getPasswordEntered(): Promise<void> {
        this.storagePasswordEntered = true;
        for (const password of this.encryptedPasswords) {
            this.passwords.push(await this.cryptoService.decryptPassword(password));
        }
    }

    ngOnInit(): void {
        this.encryptedPasswords = [];
        this.fetched = false;

        if (this.token != null) {
            this.passwordsService.getPasswords(this.token).subscribe((data) => {
                this.encryptedPasswords = data;
                this.newUser = this.encryptedPasswords.length === 0;
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
            .result.then(async (result) => {
                if (result === 'save') {
                    const editPassword = this.editPasswordComponent.editPassword;
                    const encryptedPassword = await this.cryptoService.encryptPassword(
                        editPassword
                    );
                    this.passwordsService
                        .postPassword(this.token, encryptedPassword)
                        .subscribe((response) => {
                            if ((response as HttpResponse<IPassword>).status === 201) {
                                editPassword._id = (response as HttpResponse<IPassword>).body._id;
                                this.passwords.push(editPassword);
                                this.editPasswordComponent.clearPassword();
                                this.counterComponent.refreshToken();
                                this.toastService.showGreen({
                                    header: 'Added new Password',
                                    body: 'Successfully added new Password!',
                                });
                            }
                        });
                }
            });
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
                async (result) => {
                    if (result === 'save') {
                        const editPassword = this.editPasswordComponent.editPassword;
                        const encryptedPassword = await this.cryptoService.encryptPassword(
                            editPassword
                        );
                        this.passwordsService
                            .updatePassword(this.token, encryptedPassword)
                            .subscribe((response) => {
                                if ((response as HttpResponse<any>).status === 204) {
                                    this.counterComponent.refreshToken();
                                    this.toastService.showYellow({
                                        header: 'Updated new Password',
                                        body: 'Successfully updated new Password!',
                                    });
                                    this.passwords[
                                        this.passwords.findIndex(
                                            (item) => item._id === editPassword._id
                                        )
                                    ] = editPassword;
                                    this.editPasswordComponent.clearPassword();
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
                this.passwords = this.passwords.filter((item) => item._id !== password._id);
                this.counterComponent.refreshToken();
                this.toastService.showRed({
                    header: 'Deleted Password',
                    body: 'Successfully deleted Password!',
                });
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
