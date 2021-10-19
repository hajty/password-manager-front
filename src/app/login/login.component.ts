import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/shared/user.model';
import { LoginService } from 'src/app/_services/login.service';
import { Token } from 'src/app/_models/shared/token.model';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    model = { email: '', password: '' };
    loginResult = null;
    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastService
    ) {}
    onSubmit(): void {
        const user: User = {
            email: this.model.email.trim(),
            password: this.model.password.trim(),
        };
        this.loginService.login(user).subscribe(
            (resp) => {
                if (resp.status === 200) {
                    const token: Token = {
                        accessToken: resp.body.accessToken,
                        refreshToken: resp.body.refreshToken,
                        expiresIn: resp.body.expiresIn,
                    };
                    this.loginService.setToken(token);
                    this.router.navigate(['/passwords']).then(() =>
                        this.toastService.showGreen({
                            header: 'Logged in',
                            body: 'You have logged in!',
                        })
                    );
                }
            },
            (error) => {
                if (error.status === 400 || error.status === 401) {
                    this.loginResult = 'wrong e-mail or password';
                }
            }
        );
    }
}
