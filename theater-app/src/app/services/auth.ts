// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../core/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../core/firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);
  isAuthReady = signal(false);

  constructor(private router: Router) {
    onAuthStateChanged(auth, (user) => {
      this.currentUser.set(user);
      this.isAuthReady.set(true);
    });
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
    this.router.navigate(['/']);
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  async register(email: string, password: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // User in Firestore anlegen mit approved: false
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      approved: false,
      createdAt: serverTimestamp()
    });
    this.router.navigate(['/pending']);
  }
}