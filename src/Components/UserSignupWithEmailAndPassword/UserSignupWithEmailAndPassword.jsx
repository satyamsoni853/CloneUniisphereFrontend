import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import Unispherelogo from "./Unispherelogo.png";
import "./UserSignupWithEmailAndPassword.css";

function UserSignupWithEmailAndPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill("")); // Array to store 6 digits
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Handle registration and OTP sending
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/register",
        { email, password }
      );
      console.log("OTP sent:", response.data);
      setStep(2);
      setSuccessMessage("OTP sent to your email!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP. Please check your email and password."
      );
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const otpString = otp.join("");
    try {
      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/verifyOtp",
        { email, otp: otpString }
      );
      console.log("OTP verified:", response.data);

      const token = response.data.tempToken;
      if (!token) {
        setError("No authentication token received from server. Please try again.");
        return;
      }

      console.log("Token received successfully:", token.substring(0, 10) + "...");
      navigate("/afterotpsection1", {
        state: { email, password, token },
      });
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Email is required to resend OTP.");
      return;
    }

    try {
      setIsResendDisabled(true);
      setCooldownTime(30);

      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/resendOtp",
        { email }
      );
      console.log("OTP resent:", response.data);

      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();

      setSuccessMessage("New OTP sent to your email!");
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    }
  };

  // Handle cooldown timer
  useEffect(() => {
    let timer;
    if (isResendDisabled && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled, cooldownTime]);

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key events (e.g., backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="login-wrapper-1">
        <Background />
        <img
          src={Unispherelogo}
          alt="Unisphere Logo-1"
          className="top-left-logo"
        />
        <div className="login-container-1">
          <div>
            <h1 className="unisphere-title-container">
              <span className="u">U</span>
              <span className="n">N</span>
              <span className="i">I</span>
              <span className="i">I</span>
              <span className="s">S</span>
              <span className="p">P</span>
              <span className="h">H</span>
              <span className="e">E</span>
              <span className="r">R</span>
              <span className="e">E</span>
            </h1>
          </div>
          <div className="Succeed-1">
            <h3>
              <span>"Connect" </span>
              <span>"Collaborate" </span>
              <span>"Succeed"</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="signup-Page-1">
        <div className="UserSignupwithemailandpass-container">
          <Background />
          {step === 1 && (
            <form onSubmit={handleRegister} className="Signup-form">
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <button className="login-singup-button" type="submit">
                Send OTP
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="otp-container">
              <h2>Confirm your email</h2>
              <p>We have sent a 6-digit verification code to {email}</p>
              <div className="otp-input-container" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <button className="login-singup-button" type="submit">
                Continue
              </button>
              <button
                className="login-singup-button"
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                style={{ marginTop: "10px" }}
              >
                {isResendDisabled ? `Resend OTP (${cooldownTime}s)` : "Resend OTP"}
              </button>
            </form>
          )}
          <div className="Login-here-sentence">
            <p>
              Already have an account? <a href="/">Login here</a>
            </p>
            <p>Your Privacy Is Important</p>
            <p>
              We may send you member updates, recruiter message, job
              suggestions, invitations, reminder and promotional messages from
              us and our parents. You can change your preference anytime.
            </p>
          </div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserSignupWithEmailAndPass;