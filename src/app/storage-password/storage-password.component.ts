import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PasswordsComponent } from 'src/app/passwords/passwords.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-storage-password',
    templateUrl: './storage-password.component.html',
    styleUrls: ['./storage-password.component.css'],
})
export class StoragePasswordComponent implements OnInit, AfterViewInit {
    @ViewChild('passwordModal') passwordModal: HTMLElement;
    storagePassword = '';

    constructor(private modalService: NgbModal, public passwordsComponent: PasswordsComponent) {}

    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.modalService
            .open(this.passwordModal, {
                backdrop: 'static',
                centered: true,
            })
            .result.then(
                (result) => {
                    if (result === 'enter') {
                        this.passwordsComponent.fetched = true;
                    } else if (result === 'logout') {
                        this.passwordsComponent.onClickLogout();
                    }
                },
                () => {}
            );
    }
}
