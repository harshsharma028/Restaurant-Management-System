import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { SignupPage } from './auth/signup-page/signup-page';
import { LoginPage } from './auth/login-page/login-page';

export const routes: Routes = [
  { path: '', component: HomePage },     // default page
  { path: 'signup', component: SignupPage },
  { path: 'login', component: LoginPage },

  // safety fallback
  { path: '**', redirectTo: '' }
];
