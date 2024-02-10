import React from 'react'
import { app } from '../config'
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";

const auth = getAuth(app)
export default async function Login(email: string, password: string) {
    return signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  }