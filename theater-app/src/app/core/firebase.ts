import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '@env/environment';
import { getAuth } from 'firebase/auth';

const app = initializeApp(environment.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);