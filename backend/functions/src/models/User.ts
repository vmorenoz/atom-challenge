import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

export interface User {
  id?: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateUserRequest {
  email: string;
}

export interface UserResponse {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}