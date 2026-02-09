import { Routes } from '@angular/router';
import { WelcomePage } from '../components/core/welcome-page/welcome-page';
import { UserLogin } from '../components/core/user-login/user-login';
import { UserDashboard } from '../components/core/user-dashboard/user-dashboard';
import { UserRegistration } from '../components/core/user-registration/user-registration';

export const routes: Routes = [
  { path: "", component: WelcomePage, },
  { path: "login", component: UserLogin, },
  { path: "signup", component: UserRegistration, },
  { path: "dashboard", component: UserDashboard, children: [] },
  { path: "**", component: WelcomePage }
];
