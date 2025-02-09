import React, { useContext } from 'react'
import { UserinfoContext } from '../Contexts/UserContext'

const UserProfile = () => {
    const {user} = useContext(UserinfoContext)
    console.log(user)
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
                </div>
            )
        }
    </div>
  )
}

export default UserProfile