import {inject, Injectable} from '@angular/core';
import {Auth, signInWithCustomToken} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth = inject(Auth);

  signInWithToken(token: string): Promise<any> {
    return signInWithCustomToken(this.auth, token);
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
