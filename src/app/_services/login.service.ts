import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/_models/shared/user.model';
import { URL_LOGIN, URL_REGISTER, URL_TOKEN } from 'src/configs/app.config';
import { Observable } from 'rxjs';
import { Token } from 'src/app/_models/shared/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private token: Token = null;

    setToken(token: Token): void {
      this.token = token;
    }

    getToken(): Token {
      return this.token;
    }

    constructor(
      private http: HttpClient
    ) {}

    register(user: User): Observable<HttpResponse<any>> {
      const userToAdd = {
          user: {
              email: user.email,
              password: user.password
          }
      };
      return this.http.post<User>(URL_REGISTER, userToAdd, { observe: 'response' });
    }

    login(user: User): Observable<HttpResponse<any>> {
      const userToLogin = {
          user: {
              email: user.email,
              password: user.password
          }
      };
      return this.http.post<Token>(URL_LOGIN, userToLogin, { observe: 'response' });
    }

    refreshToken(token: Token): Observable<Token> {
        return this.http.get<Token>(URL_TOKEN, {
            headers: { authorization: token.refreshToken },
            observe: 'body'
        });
    }
}
