"use client"

import { FormEvent, useState } from "react";
import axios from "axios"

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e : FormEvent) => {
    e.preventDefault();

    try{
        const response = await axios.post("/api/authors/sign-up", {
          data : {
            name, 
            email,
            password
          }
        })

        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
    
          console.log("Sign-up successful!");
        } else {
          console.log(response.data.error || response.data.message);
        }
        
        setName('')
        setEmail('')
        setPassword('')


        console.log(response.data)
    }catch(error){
        console.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account? <a href="/login/sign-in" className="text-blue-500 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
