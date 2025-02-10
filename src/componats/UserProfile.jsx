import React, { useContext } from 'react'
import { UserinfoContext } from '../Contexts/UserContext'
import { getAuth, signOut } from "firebase/auth";
import {app}  from "../firebase/firebase";

const UserProfile = () => {
  const { user } = useContext(UserinfoContext);
    
  const handleSignout = ()=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
        alert('Sign Out Successfull')
    })
  }
  return (
    <div>
        <h1 className='text-center text-6xl font-bold my-5'>Profile</h1>

        {
            user && (
                <div>
                    <img src={user.photo} alt="" />
                    <h2 className='text-3xl font-bold my-5'>Username: {user.name}</h2>
                    <h2 className='text-3xl font-bold my-5'>Username: {user.email}</h2>
                    <h2 className='text-3xl font-bold my-5'>Uid: {user.uid}</h2>
                    <h2 className='text-3xl font-bold my-5'>Status: {user.virefied}</h2>

                    <button className='bg-teal-300 text-white p-2' onClick={handleSignout}>Sign Out</button>
                </div>
            )
        }
    </div>
  )
}

export default UserProfile