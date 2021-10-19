import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PasswordsComponent } from './passwords/passwords.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoragePasswordComponent } from './storage-password/storage-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { CounterComponent } from './counter/counter.component';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PasswordsComponent,
        StoragePasswordComponent,
        EditPasswordComponent,
        CounterComponent,
        ToastsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'passwords', component: PasswordsComponent },
        ]),
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
