import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { PasswordsComponent } from 'src/app/passwords/passwords.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FileService } from 'src/app/_services/file.service';

@Component({
    selector: 'app-storage-password',
    templateUrl: './storage-password.component.html',
    styleUrls: ['./storage-password.component.css'],
})
export class StoragePasswordComponent implements OnInit, AfterViewInit {
    @Input() newUser: boolean;
    @Output() passwordEntered: EventEmitter<null> = new EventEmitter<null>();
    @ViewChild('passwordModal')
    passwordModal: HTMLElement;

    constructor(
        private modalService: NgbModal,
        public passwordsComponent: PasswordsComponent,
        private cryptoService: CryptoService,
        private fileService: FileService
    ) {}

    private generateKey(): void {
        const storageKey = this.cryptoService.generateKey();
        this.fileService.saveFile(storageKey);
    }

    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.modalService
            .open(this.passwordModal, {
                backdrop: 'static',
                centered: true,
            })
            .result.then(
                async (result) => {
                    if (result === 'enter') {
                        this.passwordEntered.emit();
                    } else if (result === 'generate') {
                        this.generateKey();
                        this.passwordEntered.emit();
                    } else if (result === 'logout') {
                        this.passwordsComponent.onClickLogout();
                    }
                },
                () => {}
            );
    }

    onFileSelected(event): void {
        const file: File = event.target.files[0];

        if (file) {
            this.cryptoService.storageKey = file;
        }
    }
}
