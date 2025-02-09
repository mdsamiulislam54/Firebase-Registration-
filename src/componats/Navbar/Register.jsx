import React, { useContext } from "react";
import { Link } from "react-router";
import { AiFillGoogleSquare } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { UserinfoContext } from "../../Contexts/UserContext";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { registerUser, Userinfo,user } = useContext(UserinfoContext);
  // const {registerUser }= userInfo
  console.log(user);

  console.log(registerUser);
  const formhandle = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fastName = e.target.fastName.value;
    const lastName = e.target.lastName.value;
    const confirmPassword = e.target.confirmPassword.value;

    registerUser(email, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${fastName} ${lastName}`,

        }).then(()=>{
          Userinfo({
            email: user.email,
            name : user.displayName,
            uid: user.uid
  
          })
        })
       
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={formhandle}
        action=""
        className="w-1/2 mx-auto bg-gray-800 mt-10 p-10 text-white shadow-2xl rounded-2xl"
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
          type="password"
          name="password"
          placeholder="Enter Your Password......."
          className="w-full p-2 mb-6 border-1 rounded-2xl"
        ></input>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm Your Password  "
          className="w-full p-2 mb-6 border-1 rounded-2xl"
        ></input>

        <div className="">
          <input type="checkbox" name="" id="checkbox" className="mx- mb-6" />
          <label
            className="text-sky-300 hover:text-sky-500 mx-3 text-base"
            for="checkbox"
          >
            Show Pasword
          </label>
        </div>
        {/* submit button */}
        <input
          type="submit"
          value="Sign Up"
          className="w-full bg-white px-4 py-2 text-black rounded-2xl cursor-pointer mb-10"
        />
        {/* submit button */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <hr className="w-1/4" />
          <p>Or</p>
          <hr className="w-1/4" />
        </div>
        <div className="flex flex-col justify-around items-center gap-5 mb-6">
          <button className="  flex items-center gap-3 px-4 py-2 bg-white text-black font-bold rounded-2xl cursor-pointer ">
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
      </form>
    </div>
  );
};

export default Register;
