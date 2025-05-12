import { useState, useEffect } from "react";
import "./GuiednestComingSoon.css";
import Background from '../Background/Background.jsx' 
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'

function GuiednestComingSoon() {
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
    <div className="GuiednestComingSoon-container-navbar">
    <DesktopNavbar/>
    </div>
    <div className="GuiednestComingSoon-container">
    <div className="GuiednestComingSoon-container-background">
      <Background/>
    </div>
     
      <div className="GuiednestComingSoon-content">
        <div className="FreenlancingComingSoon-main-heading">
            Guiednest
        </div>
        <h1 className="GuiednestComingSoon-title GuiednestComingSoon-glow GuiednestComingSoon-bounce">
          Launching Soon!
        </h1>
        <p className="GuiednestComingSoon-subtitle GuiednestComingSoon-fade-in">
          Get ready for something extraordinary! Join our waitlist now.
        </p>
        <div className="GuiednestComingSoon-form GuiednestComingSoon-slide-up">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="GuiednestComingSoon-input"
          />
          <button
            onClick={handleSubmit}
            className="GuiednestComingSoon-button GuiednestComingSoon-glow-button"
          >
            Join Waitlist
          </button>
        </div>
        <div className="GuiednestComingSoon-description">
          <span className="GuiednestComingSoon-description-heading">Description of Feature</span>
          <span className="GuiednestComingSoon-description-text">
     Mentorship  connects you with the professionals in the industry,mentors, alumni, and senior based on your interests and career goals, offering instant advice and long term guidance , and may be reference in your dream company from the people who’ve been in your shoes.
          </span>
        </div>
        <div className="GuiednestComingSoon-timer GuiednestComingSoon-slide-up">
          <div className="GuiednestComingSoon-timer-card">
            <span className="GuiednestComingSoon-timer-value">{time.days}</span>
            <span className="GuiednestComingSoon-timer-label">Days</span>
          </div>
          <div className="GuiednestComingSoon-timer-card">
            <span className="GuiednestComingSoon-timer-value">{time.hours}</span>
            <span className="GuiednestComingSoon-timer-label">Hours</span>
          </div>
          <div className="GuiednestComingSoon-timer-card">
            <span className="GuiednestComingSoon-timer-value">{time.minutes}</span>
            <span className="GuiednestComingSoon-timer-label">Minutes</span>
          </div>
          <div className="GuiednestComingSoon-timer-card">
            <span className="GuiednestComingSoon-timer-value">{time.seconds}</span>
            <span className="GuiednestComingSoon-timer-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default GuiednestComingSoon;
