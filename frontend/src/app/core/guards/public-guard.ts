import {CanActivateFn, Router} from '@angular/router';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {inject} from '@angular/core';

function waitForAuth(auth: Auth) {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, (user) => { unsub(); resolve(user); }, () => { unsub(); resolve(null); });
  });
}

export const publicGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const user = auth.currentUser ?? await waitForAuth(auth);
  return user ? router.parseUrl('/tasks') : true;
};
