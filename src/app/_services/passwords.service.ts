import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/users/shared/token.model';
import { Observable } from 'rxjs';
import { Password } from 'src/app/users/shared/password.model';
import { URL_PASSWORDS } from 'src/configs/app.config';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {
  constructor(
      private http: HttpClient
  ) {}
  getPasswords(token: Token): Observable<Password[]> {
    return this.http.get<Password[]>(
        URL_PASSWORDS, { headers: {
          authorization: token.accessToken
          },
          observe: 'body' });
  }
}
