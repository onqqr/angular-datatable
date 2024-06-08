import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyAAjCkNE8TdEAqbBpfEO0ek9ip6IkbJiQU",
  authDomain: "angular-hw-4e347.firebaseapp.com",
  projectId: "angular-hw-4e347",
  storageBucket: "angular-hw-4e347.appspot.com",
  messagingSenderId: "44503326135",
  appId: "1:44503326135:web:757ec1963550ee41df1c32",
  measurementId: "G-BJ0ZRY0BK2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), provideAnimationsAsync(),
  ],
};
