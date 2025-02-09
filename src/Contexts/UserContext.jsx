import React, { useState } from 'react'
import { createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'



export const UserinfoContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)
    const registerUser = (email, password) => {
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