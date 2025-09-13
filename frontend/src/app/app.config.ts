import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "challenges-64ca3",
        appId: "1:274795279184:web:54f0b486833cfa8be2f255",
        storageBucket: "challenges-64ca3.firebasestorage.app",
        apiKey: "AIzaSyCupcFWiCgTpIB02x3aIjPBxnAet9jaRZk",
        authDomain: "challenges-64ca3.firebaseapp.com",
        messagingSenderId: "274795279184",
        measurementId: "G-G43FQX2LYH" })
    ),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
