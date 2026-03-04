import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login';
import { authGuard } from './guards/auth-guard';
import { RolesComponent } from './containers/roles/roles';
import { noAuthGuard } from './guards/no-auth-guard';
import { HomeComponent } from './containers/home/home';

export const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [authGuard] }
  // weitere routen...
];
