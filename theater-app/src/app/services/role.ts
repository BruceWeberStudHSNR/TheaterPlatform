import { Injectable } from '@angular/core';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../core/firebase';

@Injectable({ providedIn: 'root' })
export class RoleService {
  async getAllRoles(): Promise<Record<string, string[]>> {
    const snapshot = await getDocs(collection(db, 'roles'));
    const result: Record<string, string[]> = {};
    snapshot.docs.forEach(d => {
      result[d.id] = d.data()['applicants'] ?? [];
    });
    return result;
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
    await updateDoc(doc(db, 'roles', roleId), { applicants: arrayRemove(email) });
  }
}