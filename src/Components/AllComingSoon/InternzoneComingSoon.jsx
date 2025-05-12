import { useState, useEffect } from "react";
import "./InternzoneComingSoon.css";
import Background from "../Background/Background.jsx";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";

function InternzoneComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}! Get ready for the big reveal!`);
      setEmail("");
    } else {
      alert("Please enter a valid email.");
    }
  };

  const [time, setTime] = useState({
    days: 15,
    hours: 10,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="InternzoneComingSoon-container-navbar">
        <DesktopNavbar />
      </div>
      <div className="InternzoneComingSoon-container">
        <div className="InternzoneComingSoon-container-background">
          <Background />
        </div>

        <div className="InternzoneComingSoon-content">
          <div className="FreenlancingComingSoon-main-heading">Internzone</div>
          <h1 className="InternzoneComingSoon-title InternzoneComingSoon-glow InternzoneComingSoon-bounce">
            Launching Soon!
          </h1>
          <p className="InternzoneComingSoon-subtitle InternzoneComingSoon-fade-in">
            Get ready for something extraordinary! Join our waitlist now.
          </p>
          <div className="InternzoneComingSoon-form InternzoneComingSoon-slide-up">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="InternzoneComingSoon-input"
            />
            <button
              onClick={handleSubmit}
              className="InternzoneComingSoon-button InternzoneComingSoon-glow-button"
            >
              Join Waitlist
            </button>
          </div>
          <div className="InternzoneComingSoon-description">
            <span className="InternzoneComingSoon-description-heading">
              Description of Feature
            </span>
            <span className="InternzoneComingSoon-description-text">
              Internzone hooks you up with real internships from startups,
              renowned Companies , NGOs, and student ventures which are matched
              to your skills, interests, and goals. These internships are also
              remote-friendly, verified, and built to boost your experience
              before you even graduate.
            </span>
          </div>
          <div className="InternzoneComingSoon-timer InternzoneComingSoon-slide-up">
            <div className="InternzoneComingSoon-timer-card">
              <span className="InternzoneComingSoon-timer-value">
                {time.days}
              </span>
              <span className="InternzoneComingSoon-timer-label">Days</span>
            </div>
            <div className="InternzoneComingSoon-timer-card">
              <span className="InternzoneComingSoon-timer-value">
                {time.hours}
              </span>
              <span className="InternzoneComingSoon-timer-label">Hours</span>
            </div>
            <div className="InternzoneComingSoon-timer-card">
              <span className="InternzoneComingSoon-timer-value">
                {time.minutes}
              </span>
              <span className="InternzoneComingSoon-timer-label">Minutes</span>
            </div>
            <div className="InternzoneComingSoon-timer-card">
              <span className="InternzoneComingSoon-timer-value">
                {time.seconds}
              </span>
              <span className="InternzoneComingSoon-timer-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InternzoneComingSoon;
