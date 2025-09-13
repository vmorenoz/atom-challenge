import * as admin from 'firebase-admin';
import {ServiceAccount} from 'firebase-admin';
import * as serviceAccountConfig from '../config/serviceAccount.json';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountConfig as ServiceAccount)
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  TASKS: 'tasks'
} as const;