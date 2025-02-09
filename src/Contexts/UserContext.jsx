import React, { useState } from 'react'
import { createContext } from 'react'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import app from '../firebase/firebase'




export const UserinfoContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)
    const registerUser = (email, password) => {
        const  auth = getAuth(app)
        return createUserWithEmailAndPassword(auth,email,password);
    }
const Userinfo =(profile)=>{
    setUser(profile)
}

const UserinformationData = {user,registerUser,Userinfo}

  return (
   <UserinfoContext.Provider value={UserinformationData}>
        {children}
   </UserinfoContext.Provider>
  )
}

export default UserContext