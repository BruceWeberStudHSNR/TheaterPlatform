import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login';
import { authGuard } from './guards/auth-guard';
import { RolesComponent } from './containers/roles/roles';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesComponent, canActivate: [authGuard]}
  // weitere routen...
];
