import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from 'src/app/_models/shared/token.model';
import { Observable, of } from 'rxjs';
import { IPassword } from 'src/app/_models/shared/password.model';
import { URL_PASSWORD, URL_PASSWORDS } from 'src/configs/app.config';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  constructor(
      private http: HttpClient
  ) {}

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
      return (error: any): Observable<T> => {
          console.error(`${operation} error: ${error.message}`);
          return of(result as T);
      };
  }

  getPasswords(token: Token): Observable<IPassword[]> {
    return this.http.get<IPassword[]>(URL_PASSWORDS, { headers: {
          authorization: token.accessToken
          }, observe: 'body' }).pipe(
              catchError(this.handleError<IPassword[]>('getPasswords', []))
    );
  }

  postPassword(token: Token, password: IPassword): Observable<IPassword[] | HttpResponse<any>> {
      return this.http.post(URL_PASSWORDS, { password }, { headers: {
          authorization: token.accessToken
          }, observe: 'response'}).pipe(
              catchError(this.handleError<IPassword[]>('postPassword', []))
      );
  }

  updatePassword(token: Token, password: IPassword): Observable<IPassword[] | HttpResponse<any>> {
      const parametersToUpdate: IPassword = {
          service: password.service,
          username: password.username,
          password: password.password
      };
      return this.http.patch(`${URL_PASSWORD}/${password._id}`, { parametersToUpdate }, { headers: {
              authorization: token.accessToken
          }, observe: 'response'}).pipe(
          catchError(this.handleError<IPassword[]>('updatePassword', []))
      );
  }

  deletePassword(token: Token, password: IPassword): Observable<IPassword[] | HttpResponse<any>> {
      return this.http.delete(`${URL_PASSWORD}/${password._id}`, { headers: {
              authorization: token.accessToken
          }, observe: 'response'}).pipe(
          catchError(this.handleError<IPassword[]>('deletePassword', []))
      );
  }
}
