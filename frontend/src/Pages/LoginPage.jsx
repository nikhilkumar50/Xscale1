import React, { useState } from "react";
import login from "../assets/login.jpg";
import  {useNavigate} from "react-router-dom";
import {  UserAuth } from '../context/AuthContext';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/')
    } catch (e) {
      setError(e.message);
      
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={login} alt="" />
      </div>

      <div className="bg-gray-50 flex flex-col justify-center ">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto  bg-gray-50 p-8 px-8 border border-secondary rounded-2xl shadow-xl bg-primary"
        >
          <h2 className="text-2xl dark:text-white font-bold text-center">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              id="email"
              className="rounded-lg bg-gray-200 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              id="password"
              className="p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" id="checkbox" /> Remember
              Me
            </p>
            <p>Forgot Password ?</p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
