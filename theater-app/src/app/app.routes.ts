import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // weitere routen...
];
