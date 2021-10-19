import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/shared/user.model';
import { LoginService } from 'src/app/_services/login.service';
import { CountdownService } from 'src/app/_services/countdown.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [LoginService],
})
export class RegisterComponent {
    private time = 5;
    model = { oldEmail: '', email: '', password: '', confirmPassword: '' };
    registrationResult = null;
    timeToRedirect = `${this.time}`;
    constructor(
        private router: Router,
        private loginService: LoginService,
        private countdownService: CountdownService
    ) {}
    private clearEmail(): void {
        this.model.oldEmail = this.model.email;
        this.model.email = '';
    }
    onSubmit(): void {
        const user: User = {
            email: this.model.email.trim(),
            password: this.model.password.trim(),
        };
        this.loginService.register(user).subscribe(
            (resp) => {
                if (resp.status === 201) {
                    this.registrationResult = 'success';
                    this.countdownService.countdown(this.time, 's').subscribe(
                        (x) => (this.timeToRedirect = x),
                        () => {},
                        () => {
                            this.router.navigate(['/login']).then();
                        }
                    );
                }
            },
            (error) => {
                if (error.status === 409 && error.error === 'User already exists') {
                    this.registrationResult = 'user exists';
                    this.clearEmail();
                }
                if (error.status === 400 && error.error === 'Wrong body format') {
                    this.registrationResult = 'wrong body format';
                }
            }
        );
    }
}
