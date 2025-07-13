import React, { useState, useEffect } from "react";

import { Eye, EyeOff, Phone, Mail, User, Lock } from "lucide-react";
import { useUserAuth } from "../../context/userAuthContext";

const Login = () => {
  const [authMode, setAuthMode] = useState("signin"); // 'signin', 'signup', 'phone'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("recapcha", recaptchaVerifier);

  const {
    signIn,
    signUp,
    signInWithPhone,
    verifyOTP,
    setUpRecaptcha,
    resetPassword,
    error,
    clearError,
  } = useUserAuth();

  // useEffect(() => {
  //   if (authMode === 'phone') {
  //     const recaptcha = setUpRecaptcha('recaptcha-container');
  //     setRecaptchaVerifier(recaptcha);
  //   }
  // }, [authMode]);

  useEffect(() => {
    clearError();
  }, [authMode, clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === "signin") {
        await signIn(formData.email, formData.password);
      } else if (authMode === "signup") {
        await signUp(formData.email, formData.password, formData.displayName);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signInWithPhone(
        formData.phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(result);
    } catch (error) {
      console.error("Phone authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyOTP(confirmationResult, otp);
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      alert("Please enter your email address first");
      return;
    }

    try {
      await resetPassword(formData.email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      displayName: "",
      phoneNumber: "",
    });
    setOtp("");
    setConfirmationResult(null);
    clearError();
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    resetForm();
  };

  if (confirmationResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center">
              <Phone className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Verify OTP
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter the verification code sent to {formData.phoneNumber}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleOTPVerification}
                  disabled={isLoading}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  onClick={() => setConfirmationResult(null)}
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-indigo-600">
              {
              authMode === 'phone' ?
               <Phone 
              className="h-full w-full" /> 
              : <Mail className="h-full w-full" />}
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {authMode === "signin"
                ? "Sign in to your account"
                : authMode === "signup"
                ? "Create new account"
                : "Sign in with phone"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {authMode === "signin"
                ? "Welcome back!"
                : authMode === "signup"
                ? "Join our community"
                : "Enter your phone number"}
            </p>
          </div>

          {/* Auth Mode Tabs */}
          <div className="flex mt-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => switchAuthMode("signin")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                authMode === "signin"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchAuthMode("signup")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                authMode === "signup"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
            {/* <button
              onClick={() => switchAuthMode('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                authMode === "phone"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Phone
            </button> */}
          </div>

          {/* Email/Password Form */}
          {authMode !== "phone" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                {authMode === "signup" && (
                  <div>
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Display Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <button
                  onClick={handleEmailAuth}
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading
                    ? "Loading..."
                    : authMode === "signin"
                    ? "Sign In"
                    : "Sign Up"}
                </button>
              </div>

              {authMode === "signin" && (
                <div className="text-center">
                  <button
                    onClick={handlePasswordReset}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Phone Authentication Form */}
          {/* {authMode === 'phone' && (
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+1234567890"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Please include country code (e.g., +1 for US)
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <button
                  onClick={handlePhoneAuth}
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </button>
              </div>
            </div>
          )} */}

          {/* ReCAPTCHA Container */}
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
