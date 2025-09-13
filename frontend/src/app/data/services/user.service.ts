import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {catchError, map} from 'rxjs';
import {User} from '@data/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  readonly httpClient = inject(HttpClient);

  findUserByEmail(email: string) {
    const url = `${environment.apiUrl}/findUser`;
    return this.httpClient.post(url, {email})
      .pipe(map((res: any) => {
        return res.data as User
      }), catchError(err => {
        throw err;
      }));
  }

  addUser(email: string) {
    const url = `${environment.apiUrl}/addUser`;
    return this.httpClient.post(url, {email})
      .pipe(map((res: any) => {
        return res.data as User
      }), catchError(err => {
        throw err;
      }));
  }
}
