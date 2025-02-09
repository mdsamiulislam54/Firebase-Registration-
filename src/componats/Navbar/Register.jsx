import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AiFillGoogleSquare } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { UserinfoContext } from "../../Contexts/UserContext";
import { updateProfile } from "firebase/auth";
import app  from "../../firebase/firebase.js";
import { getAuth ,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const { registerUser, Userinfo,user } = useContext(UserinfoContext);
  const [sucessfull , setScessfull] = useState('')
  const [error , setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkCondition, setCheckCondition] = useState(false);
  const fromClear = useRef()
  const navigate = useNavigate();

  const showPasswordhandle = () => {
    setShowPassword(!showPassword);
  }
 

  const formhandle = (e) => {
    e.preventDefault();
    const from = fromClear.current

    const email = e.target.email.value;
    const password = e.target.password.value;
    const fastName = e.target.fastName.value;
    const lastName = e.target.lastName.value;
    const confirmPassword = e.target.confirmPassword.value;
    setScessfull('')
    setError('')

    if(fastName==='' || lastName===''){
      setError('First Name and Last Name must be filled')
      return
    }
    else if(password !== confirmPassword){
      setError('Password and Confirm Password must be same')
      return
    }
    else if(password.length < 6 || confirmPassword.length < 6){
      setError('Password must be at least 6 character long')
      return
    }
    else if(!checkCondition){
      setError('You must agree to the terms and conditions')
      return
    }


    registerUser(email, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setScessfull("Registration Sucessfully!")
        navigate('/signin')
        updateProfile(user, {
          displayName: `${fastName} ${lastName}`,

        }).then(()=>{
          Userinfo({
            email: user.email,
            name : user.displayName,
            uid: user.uid
  
          })
        })

        from.reset()
       
      })
      .catch((err) => {
        console.log(err);
       setError('Registration fiald already create a account' )
      });
  };

  const handleGoogle = () => {
    const auth = getAuth(app);
    const Googleprovider = new GoogleAuthProvider();
    signInWithPopup(auth, Googleprovider)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user);
      setScessfull("Registration Sucessfully!")
      navigate('/')
      // updateProfile(user, {
        
      //   email: user.email,
      //   uid : user.uid,
      //   photoURL : user.photoURL

      // })
      Userinfo({
        email: user.email,
        name : user.displayName,
        uid: user.uid,
        photo : user.photoURL
      })
    }).catch((err)=>{
      console.log(err);
      setError('Registration fiald already create a account' )

    })
  }

  return (
    <div className="w-1/2 mx-auto relative bg-gray-800  shadow-2xl text-white">
      <form
        ref={fromClear}
        onSubmit={formhandle}
        action=""
        className="    mt-10 p-10 text-white  rounded-2xl"
      >
        <h1 className="text-center text-xl font-bold mb-6">Sign Up</h1>
        <div className="flex gap-3">
          <input
            type="text"
            name="fastName"
            placeholder="Enter Your Fast Name"
            className="w-full p-2 mb-6 border-1 rounded-2xl"
          ></input>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your last Name"
            className="w-full p-2 mb-6 border-1 rounded-2xl"
          ></input>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="w-full p-2 mb-6 border-1 rounded-2xl"
        ></input>
        <input
          type={showPassword? "text" : "password"}
          name="password"
          placeholder="Enter Your Password......."
          className="w-full p-2 mb-6 border-1 rounded-2xl"
        ></input>
        <input
          type={showPassword? "text" : "password"}
          name="confirmPassword"
          placeholder="confirm Your Password  "
          className="w-full p-2 mb-6 border-1 rounded-2xl"
        ></input>

        <div className="flex justify-between items-center">
          <div>
          <input type="checkbox" onChange={showPasswordhandle} name="" id="checkbox" className="mx- mb-6" />
          <label
            className="text-sky-300 hover:text-sky-500 mx-3 text-base"
            for="checkbox"
          >
            Show Pasword
          </label>
          </div>
          {/* trrms and condition part */}
          <div>
            <input type="checkbox" onChange={((e)=>setCheckCondition(e.target.checked))} checked={
              checkCondition
            } name="" id="checkboxt" className="mx- mb-6"></input>
            <label for="checkboxt" className="mx-4">I Agree To The <span className="text-teal-400 "><Link>Terms & Condition</Link></span></label>
          </div>
            {/* trrms and condition part */}
        </div>
        {/* submit button */}
        <input
          type="submit"
          value="Sign Up"
          className="w-full bg-white px-4 py-2 text-black rounded-2xl cursor-pointer mb-10"
        />
       
      </form>
      <div className="absolute left-0 w-full  top-0 ">
        {
          sucessfull && (
            <p className="text-center py-3 text-teal-400 bg-gray-700 text-2xl">{sucessfull}</p>
          )
        }
        {
          error && (
            <p className="text-center py-3 text-red-400 bg-gray-700 text-2xl">{error}</p>
          )
        }
        </div>
        {/* submit button */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <hr className="w-1/4 bg-white" />
          <p >Or</p>
          <hr className="w-1/4" />
        </div>
        <div className="flex flex-col justify-around items-center gap-5 mb-6">
          <button onClick={handleGoogle} className="  flex items-center gap-3 px-4 py-2 bg-white text-black font-bold rounded-2xl cursor-pointer ">
            <AiFillGoogleSquare size={30} /> <span>SignInWithGoogle</span>
          </button>
          <button className="  flex items-center gap-3 px-4 py-2 bg-white text-black font-bold rounded-2xl cursor-pointer">
            <FaGithub size={30} /> <span>SignInWithGithub</span>
          </button>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-center text-gray-400">Already have an account? </p>
          <Link
            to="/signin"
            className="text-sky-300 hover:text-sky-500 hover:underline"
          >
            Sign In
          </Link>
        </div>
    </div>
  );
};

export default Register;
