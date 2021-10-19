import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from 'src/app/_services/countdown.service';
import { PasswordsComponent } from 'src/app/passwords/passwords.component';
import { LoginService } from 'src/app/_services/login.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
    private counter: Subscription;
    timerText;

    constructor(
        private loginService: LoginService,
        private toastService: ToastService,
        private countDownService: CountdownService,
        private passwordsComponent: PasswordsComponent
    ) {}

    private setTimer(): void {
        if (this.counter != null) {
            this.counter.unsubscribe();
        }
        this.counter = this.countDownService
            .countdown(this.passwordsComponent.token.expiresIn, 'mm:ss')
            .subscribe(
                (x) => (this.timerText = x),
                () => {},
                () => {
                    this.passwordsComponent.token = null;
                }
            );
    }

    private refreshToken(): void {
        this.loginService
            .refreshToken(this.passwordsComponent.token)
            .subscribe((token) => (this.passwordsComponent.token = token));
        this.setTimer();
    }

    ngOnInit(): void {}

    onClickRefresh(): void {
        this.refreshToken();
        this.toastService.showYellow({
            header: 'Refreshed the token',
            body: 'Your token has been refreshed!',
        });
    }
}
