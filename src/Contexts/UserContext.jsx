import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

import app from '../firebase/firebase'




export const UserinfoContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)
    const registerUser = (email, password) => {
        const  auth = getAuth(app)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const LoginUser = (email,password)=>{
        const auth = getAuth(app)
        return signInWithEmailAndPassword(auth,email,password)
    }
const Userinfo =(profile)=>{
    setUser(profile)
}
useEffect(()=>{
    const auth = getAuth(app)
    onAuthStateChanged(auth , (user) => {
        if (user) {
            setUser({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid :  user.uid
            })
        }else{
            setUser('')
        }
    })
},[])




const UserinformationData = {user,registerUser,Userinfo,LoginUser}

  return (
   <UserinfoContext.Provider value={UserinformationData}>
        {children}
   </UserinfoContext.Provider>
  )
}

export default UserContext