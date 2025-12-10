import axios from "axios";
import React, { useState } from "react";
import { token } from "../important_Links/url";
import { loginWithOtp, sendOtp } from "../important_Links/api";
import { BiLoader } from "react-icons/bi";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [withOTP, setWithOTP] = useState(false);
  const [otpReceive, setOtpReceive] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // defining login
  const handleSubmit = (e) => {
    e.preventDefault();

    // try to login
    try {
      // send request to backend
      axios
        .post(`${import.meta.env.VITE_BASE_URL}users/login`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          localStorage.setItem("token", res.data.token);
          window.location.href = "/shyam-aura/dashboard";
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          alert(err.response.data.error);
        });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // login with OTP
  const handleLoginWithOTP = async () => {
    if (!email || !email.includes("@") || !email.includes(".com")) {
      alert("Please enter a valid email");
      return;
    }

    setLoader(true); // show loader

    const body = { email };

    try {
      await sendOtp(token, body); // ⬅ WAIT HERE

      console.log("OTP Sent:", email);
      alert("OTP Sent to " + email);

      // show OTP input field
      setOtpReceive(true);
      setWithOTP(true);
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP");
    }

    setLoader(false); // hide loader AFTER API FINISHES
  };

  // verify OTP
  const handleVerifyOTP = async () => {
    console.log('received otp:', otp)

    const body = { email, otp };
    try {
      await loginWithOtp(token, body);
      
    } catch (error) {
      console.log(error);
      alert("Login Failed, Please Try Again");
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://media.istockphoto.com/id/2166171787/video/indian-groom-put-nuptial-chain-as-a-part-of-the-hindu-traditional-ritual-to-the-bride.mp4?s=mp4-480x480-is&k=20&c=OW1IQvRBJuD8HK-NBBjJRXAsnE2CQhsBENfDxYn59Ew="
          type="video/mp4"
        />
      </video>

      {/* Left Side - Branding */}
      <div className="flex flex-col justify-center items-start w-1/2 pl-20 text-white space-y-4">
        <h2 className="text-3xl font-semibold text-black drop-shadow-lg">
          Welcome To
        </h2>
        <h2 className="text-3xl -mt-12.5 font-semibold text-white drop-shadow-lg">
          Welcome To
        </h2>

        <h1 className="text-7xl  font-extrabold text-black drop-shadow-white-2xl leading-tight">
          Shyam Aura
        </h1>
        <h1 className="text-7xl -mt-26  font-extrabold  text-pink-600 drop-shadow-white-2xl leading-tight">
          Shyam Aura
        </h1>

        <h2 className="text-3xl font-semibold text-black drop-shadow-lg">
          Matrimonial Admin Panel
        </h2>
        <h2 className="text-3xl -mt-12.5 font-semibold text-white drop-shadow-lg">
          Matrimonial Admin Panel
        </h2>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-96 text-white">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-6">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-around items-center border border-white/20 bg-gray-800/50 p-2 px-3 rounded-xl mb-6">
            <button
              onClick={() => setWithOTP(false)}
              className={`cursor-pointer transition ${
                !withOTP ? "text-pink-400 font-semibold" : "text-gray-300"
              }`}
            >
              with Credentials
            </button>

            <span className="text-gray-400">|</span>

            <button
              onClick={() => setWithOTP(true)}
              className={`cursor-pointer transition ${
                withOTP ? "text-pink-400 font-semibold" : "text-gray-300"
              }`}
            >
              with Email OTP
            </button>
          </div>

          {/* Credentials Form */}
          {!withOTP && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />

              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}

              <button className="bg-pink-600 hover:bg-pink-700 transition p-3 rounded-lg font-semibold mt-2 shadow-lg shadow-pink-600/40">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {withOTP && (
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {otpReceive === true && (
                <input
                  type="OTP"
                  placeholder="OTP"
                  className="p-3 rounded-lg bg-gray-800/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              )}

              {loader === true ? (
                <div className="flex items-center gap-1 justify-center">
                  <BiLoader className="animate-spin text-pink-600 size-10" />
                </div>
              ) : otpReceive === false ? (
                <button
                  type="button"
                  onClick={handleLoginWithOTP}
                  className="bg-pink-600 hover:bg-pink-700 transition p-3 rounded-lg font-semibold mt-2 shadow-lg shadow-pink-600/40"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="bg-pink-600 hover:bg-pink-700 transition p-3 rounded-lg font-semibold mt-2 shadow-lg shadow-pink-600/40"
                >
                  Verify OTP
                </button>
              )}
            </form>
          )}

          {/* Toggle Sign In/Up */}
          <p className="text-center mt-5 text-gray-300">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setIsSignUp(!isSignUp);
                setWithOTP(false);
              }}
              className="text-yellow-300 cursor-pointer hover:underline font-semibold"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
