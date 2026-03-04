// src/app/core/request.service.ts
import { Injectable } from '@angular/core';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

@Injectable({ providedIn: 'root' })
export class RequestService {
  async requestAccount(email: string): Promise<void> {
    await addDoc(collection(db, 'accountRequests'), {
      email,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  }
}