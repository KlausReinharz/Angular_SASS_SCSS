import firebase from 'firebase/compat/app';
import { Employee, Recruiter } from "./roles";
export * from './roles';

export interface User {
  uid: string|any;
  name: string | null;
  photoURL: string | null;
  email: string;
  country: string | null;
  about?: string | null;
  roleId?: string | null ;
  role?: Employee | Recruiter | null;
  created: firebase.firestore.FieldValue;
  updated?: firebase.firestore.FieldValue;
}
