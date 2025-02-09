import  {useContext,useState} from 'react'
import {Link} from 'react-router'
import { AiFillGoogleSquare } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword,updateProfile ,signInWithPopup, GoogleAuthProvider,sendPasswordResetEmail   } from "firebase/auth";
import { UserinfoContext } from "../../Contexts/UserContext";

import app  from "../../firebase/firebase.js";
import { useNavigate }  from "react-router";

const Login = () => {
const {Userinfo,LoginUser} = useContext(UserinfoContext)
const [errormsg , seterrormsg] = useState("");
const [email , setEmail] = useState("");


const navigate = useNavigate()



  const signInHandle =(e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    setEmail(email)

    
    LoginUser( email, password)
    .then((res)=>{
      console.log("signed in");
      const user = res.user;
      console.log(res);
      
      navigate("/")
      updateProfile(user, {
       

      }).then(()=>{
        Userinfo({
          email: user.email,
          name : user.displayName,
          uid: user.uid

        })
      })
      
    }).catch((err)=>{
      seterrormsg("Invilde Password")
    })
  }

  const handleGoogle = () => {
    const auth = getAuth(app);
    const Googleprovider = new GoogleAuthProvider();
    signInWithPopup(auth, Googleprovider)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user);
   
      navigate('/')
      updateProfile(user, {
        
        displayName: user.displayName,
        

      })
      Userinfo({
        email: user.email,
        name : user.displayName,
        uid: user.uid,
        photo : user.photoURL,
        vreifyd : user.emailVerifie
      })
    }).catch((err)=>{
      seterrormsg("Invilde Password")
     

    })
  }

const resetpassword = ()=>{
  
  const auth = getAuth(app);
  sendPasswordResetEmail(auth,email)
  .then((result)=>{
    seterrormsg("Password Reset Email Sent")
  }).then((err)=>{
    seterrormsg("Error",err)
  })
}




  return (
    <div>
        <form onSubmit={signInHandle} action="" className='w-1/2 mx-auto bg-gray-800 mt-10 p-10 text-white shadow-2xl rounded-2xl'>
            <h1 className='text-center text-xl font-bold mb-6'>Login</h1>
            <input onChange={(e)=> setEmail(e.target.value)} type="email"  name='email' placeholder="Enter Your Email" className="w-full p-2 mb-6 border-1 rounded-2xl" ></input>
            <input type="password" name='password' placeholder="Enter Your Password......." className="w-full p-2 mb-6 border-1 rounded-2xl"></input>
            <p className="text-red-400 font-light">{errormsg}</p>
            <div className='flex justify-between items-center '>
            
            <div>
                <input type="checkbox" name="" id="checkbox" className='mx-2'/>
                <label className='text-sky-300 hover:text-sky-500' for="checkbox">Show Pasword</label>
            </div>
            <li onClick={resetpassword} className='list-none text-sky-300 hover:text-sky-500 mb-6 hover:underline'><Link>Forgot Password</Link></li>
            </div>
            <input type="submit" value="Login" className='w-full bg-white px-4 py-2 text-black rounded-2xl cursor-pointer mb-10' />
            <div className='flex justify-center items-center space-x-4 mb-6'>
                <hr className='w-1/4' />
                <p>Or</p>
                <hr className='w-1/4' />
            </div>
           <div className='flex flex-col justify-around items-center gap-5 mb-6'>
           <button onClick={handleGoogle} className='  flex items-center gap-3 px-4 py-2 bg-white text-black font-bold rounded-2xl cursor-pointer '><AiFillGoogleSquare size={30} /> <span>SignInWithGoogle</span>
           </button>
           <button className='  flex items-center gap-3 px-4 py-2 bg-white text-black font-bold rounded-2xl cursor-pointer'><FaGithub size={30} /> <span>SignInWithGithub</span>
           </button>
           </div>
           <div className='flex justify-center items-center space-x-4'>
            <p className='text-center text-gray-400'>Don't have an account? </p>
            <Link to="/signup" className='text-sky-300 hover:text-sky-500 hover:underline'>Register</Link>
           </div>
        </form>
    </div>
  )
}

export default Login