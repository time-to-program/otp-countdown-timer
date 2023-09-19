import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State variables to manage OTP input, minutes, and seconds
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]); // Re-run this effect whenever 'seconds' changes

  // Function to resend OTP
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  return (
    <div className="container">
      <div className="card">
        <h4>Verify OTP</h4>

        {/* Input field for entering OTP */}
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={({ target }) => {
            setOtp(target.value);
          }}
        />

        <div className="countdown-text">
          {/* Display countdown timer if seconds or minutes are greater than 0 */}
          
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining:{" "}
              <span style={{ fontWeight: 600 }}>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
          ) : (
            // Display if countdown timer reaches 0
            <p>Didn't receive code?</p>
          )}

          {/* Button to resend OTP */}
          <button
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
            }}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </div>

        {/* Button to submit OTP */}
        <button className="submit-btn">SUBMIT</button>
      </div>
    </div>
  );
}

export default App;
