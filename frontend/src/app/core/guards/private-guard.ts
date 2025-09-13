import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';

function waitForAuth(auth: Auth) {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, (user) => { unsub(); resolve(user); }, () => { unsub(); resolve(null); });
  });
}

export const privateGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const user = auth.currentUser ?? await waitForAuth(auth);
  return user ? true : router.parseUrl('/sign-in');
};
