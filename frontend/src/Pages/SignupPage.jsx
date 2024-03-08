import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from '../firebase';


const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate();
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, "users", user.uid), {
        username: username,
      });
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
   

    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#f2eaeb] font-montserrat">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex w-2/3 max-w-4xl bg-white rounded-[10px] shadow-lg shadow-gray-500">
          <div className="w-1/2 p-2">
            {" "}
            
            <form action="" onSubmit={handleSignup}>
              <div className="py-10">
                <h2 className="text-3xl font-extrabold">Signup</h2>
              </div>
              
              
              <div className="flex flex-col items-center">
               <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                  <input
                    onChange={(e)=>setUsername(e.target.value)} 
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                  />
                </div>
                <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                  <input
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                  />
                </div>
                <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                  <input
                    onChange={(e)=>setPassword(e.target.value)}  
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                  />
                </div>
                <div>
                  <a
                    href="/"
                    className="text-gray-500 text-[17px] hover:text-gray-600"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div>
                  <button
                    className="w-36 py-2.5 my-4  bg-[#FF4B2B] hover:bg-[#ff6e54]
                                        text-white text-sm font-bold uppercase rounded-full tracking-widest"
                  >
                    signUp
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* RIGHT SIDE BEGIN ============== */}
          <div className="w-1/2 bg-gradient-to-r from-[#45b4fe] to-[#FE436B] text-white rounded-r-[10px] py-48 px-14">
            <h2 className="text-3xl font-extrabold mb-4"></h2>
            <p></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
