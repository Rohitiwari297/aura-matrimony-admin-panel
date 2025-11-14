
import React, { useState } from "react";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
   

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-96 text-white">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form action="" method="post" className="flex flex-col gap-4">

          {/* Signup extra field */}
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-lg bg-gray-700 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-700 outline-none"
            
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-700 outline-none"
            
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 rounded-lg bg-gray-700 outline-none"
            />
          )}

          <button className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold mt-2">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-4 text-gray-300">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

