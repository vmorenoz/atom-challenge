import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {from, of, switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  const token$ = auth.currentUser
    ? from(auth.currentUser.getIdToken())
    : of<string|null>(null);

  return token$.pipe(
    switchMap((idToken) => {
      const headers = idToken
        ? req.headers.set('Authorization', `Bearer ${idToken}`)
        : req.headers;
      return next(req.clone({ headers }));
    })
  );
};
