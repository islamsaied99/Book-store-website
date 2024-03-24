import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import{ initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { routes } from './app.routes';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=>getStorage()),
    provideAuth(()=>getAuth())
    )]
   };
