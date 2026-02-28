// src/app/services/role.service.ts
import { Injectable } from '@angular/core';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from '../core/firebase';

@Injectable({ providedIn: 'root' })
export class RoleService {

  async getApplicants(roleId: string): Promise<string[]> {
    const docRef = doc(db, 'roles', roleId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return [];
    return docSnap.data()['applicants'] ?? [];
  }

  async apply(roleId: string, email: string): Promise<void> {
    const docRef = doc(db, 'roles', roleId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { applicants: [email] });
    } else {
      await updateDoc(docRef, { applicants: arrayUnion(email) });
    }
  }

  async withdraw(roleId: string, email: string): Promise<void> {
    const docRef = doc(db, 'roles', roleId);
    await updateDoc(docRef, { applicants: arrayRemove(email) });
  }
}