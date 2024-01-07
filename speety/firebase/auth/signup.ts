import React from 'react'
import { auth } from '../config'
import { createUserWithEmailAndPassword } from "firebase/auth";
export default async function signup(email: string, password: string) {
    let userCredential, error;
  
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
    } catch (e) {
      error = e;
    }
  
    return { userCredential, error };
  }