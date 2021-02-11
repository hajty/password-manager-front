import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/users/shared/user.model';
import { URL_REGISTER } from 'src/configs/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
}
