import React from 'react'
import { auth } from '../config'
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      return error;
    }
  }