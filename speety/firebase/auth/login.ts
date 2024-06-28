import React from 'react'
import { app } from '../config' 
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app)

export default async function Login(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}