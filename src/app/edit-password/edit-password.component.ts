import { Component, OnInit, ViewChild } from '@angular/core';
import { IPassword } from 'src/app/_models/shared/password.model';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.css'],
})
export class EditPasswordComponent implements OnInit {
    @ViewChild('editModal') editModal: HTMLElement;
    modalType = '';
    editPassword: IPassword = {
        service: '',
        username: '',
        password: '',
    };

    constructor() {}

    clearPassword(): void {
        this.editPassword = {
            service: '',
            username: '',
            password: '',
        };
    }

    ngOnInit(): void {}
}
