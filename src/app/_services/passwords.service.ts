import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/_models/shared/token.model';
import { Observable, of } from 'rxjs';
import { IPassword } from 'src/app/_models/shared/password.model';
import { URL_PASSWORDS } from 'src/configs/app.config';
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
}
