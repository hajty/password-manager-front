import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/users/shared/user.model';
import { URL_REGISTER } from 'src/configs/app.config';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
      private http: HttpClient
  ) {}

  private handleError<T>(result?: T): (error: any) => Observable<T> {
      return (error: any): Observable<T> => {
          console.error('error');

          return of(result as T);
      };
  }

  register(user: User): Observable<User> {
      const userToAdd = {
              user: {
                      email: user.email,
                      password: user.password
                  }
          };
      return this.http.post<User>(URL_REGISTER, userToAdd, { observe: 'body' }).pipe(
          tap((addedUser: User) => console.log(`Registered. Id: ${addedUser.id}`)),
          catchError(this.handleError<User>())
      );
  }
}
