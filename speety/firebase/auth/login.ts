import React from 'react'
import { app } from '../config' 
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app)

export default async function Login(email: string, password: string) {
  let userCredential, error;
    
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
}
  catch (e) {
    error = e;
  }
  return { userCredential, error };
}