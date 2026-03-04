// src/app/core/request.service.ts
import { Injectable } from '@angular/core';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
    async requestAccount(email: string): Promise<void> {
        await addDoc(collection(db, 'users'), {
            email,
            status: 'pending',
            createdAt: serverTimestamp()
        });
    }

    async getRequests(): Promise<any[]> {
        const snapshot = await getDocs(collection(db, 'users'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }


    async markAsApproved(id: string): Promise<void> {
        await updateDoc(doc(db, 'users', id), { approved: true });
    }
}