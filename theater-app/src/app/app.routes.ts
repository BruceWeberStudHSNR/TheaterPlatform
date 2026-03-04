import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login';
import { adminGuard, approvedGuard, authGuard } from './guards/auth-guard';
import { RolesComponent } from './containers/roles/roles';
import { noAuthGuard } from './guards/no-auth-guard';
import { AdminComponent } from './containers/admin/admin';
import { RegisterComponent } from './containers/register/register';
import { PendingComponent } from './components/pending/pending';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [authGuard, approvedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard] },
  {path:'pending', component: PendingComponent, canActivate: [authGuard]}
  // weitere routen...
];
