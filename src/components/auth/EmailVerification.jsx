
import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (value, index) => {
    if (value.length > 1) return; // Prevent entering more than one digit
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input
    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="max-w-[400px] w-full py-8 font-publicSans">
        <h1 className="text-[28px] font-poppins font-medium text-center text-[#212B36] mb-4">
          Please check your email!
        </h1>
        <p className="text-sm text-center text-[#637381] mb-10 max-w-md mx-auto">
  <span className="inline-block">
    We've emailed a 6-digit confirmation code to <span className="font-medium">acb@domain</span>, 
    please enter the code in below box to verify your email.
  </span>
</p>
<div className="mb-6 relative">
  <input
    id="email"
    type="email"
    value="demo@nivesh.cc"
    readOnly
    className="w-full px-4 text-base py-3 border border-gray-300 rounded-lg text-[#212B36] focus:outline-none peer"
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-[-10px] text-xs text-[#637381] bg-gray-50 px-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#637381] peer-focus:top-[-10px] peer-focus:text-xs"
  >
    Email address
  </label>
</div>

        <div className="flex justify-between gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-14 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          ))}
        </div>

        <button
          type="button"
          className="w-full py-3 bg-[#25703A] text-white rounded-full text-[15px] font-semibold hover:bg-[#1E5C2E] transition"
        >
          Verify
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Don’t have a code?{" "}
            <button className="text-green-600 font-semibold hover:underline">
              Resend code
            </button>
          </p>
         <Link to="/signin" className="text-sm text-gray-600 font-semibold mt-2 inline-flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Return to sign in
            </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;