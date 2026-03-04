// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, from, map, switchMap, take } from 'rxjs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../core/firebase';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.isAuthReady).pipe(
    filter(ready => ready), // warten bis Firebase Auth-Status bekannt ist
    take(1),
    map(() => authService.isLoggedIn() ? true : router.createUrlTree(['/login']))
  );
};

export const approvedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return toObservable(authService.isAuthReady).pipe(
    filter(ready => ready),
    take(1),
    switchMap(() => {
      const user = authService.currentUser();
      if (!user) return from(Promise.resolve(router.createUrlTree(['/login'])));
      return from(
        getDoc(doc(db, 'users', user.uid)).then(snapshot => {
          const data = snapshot.data();
          if (data?.['approved'] === true) return true;
          return router.createUrlTree(['/pending']);
        })
      );
    }),
  );
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return toObservable(authService.isAuthReady).pipe(
    filter(ready => ready),
    take(1),
    switchMap(() => {
      const user = authService.currentUser();
      if (!user) return from(Promise.resolve(router.createUrlTree(['/login'])));
      return from(
        getDoc(doc(db, 'aufgabenverteilung', 'WdQTe8ilCr56VI4h86am')).then(snapshot => {
          const data = snapshot.data();
          const admins: string[] = data?.['Admin'] ?? [];
          if (admins.includes(user.email ?? '')) return true;
          return router.createUrlTree(['/']);
        })
      );
    })
  );
};