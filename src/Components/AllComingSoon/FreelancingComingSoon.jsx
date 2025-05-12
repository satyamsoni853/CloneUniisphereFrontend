import { useState, useEffect } from "react";
import "./FreelancingComingSoon.css";
import Background from '../Background/Background.jsx' 
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'

function FreelancingComingSoon() {
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
    <div className="FreelancingComingSoon-container-navbar">
    <DesktopNavbar/>
    </div>
    <div className="FreelancingComingSoon-container">
    <div className="FreelancingComingSoon-container-background">
      <Background/>
    </div>
     
      <div className="FreelancingComingSoon-content">
        <div className="FreenlancingComingSoon-main-heading">
            Freenlancing
        </div>
        <h1 className="FreelancingComingSoon-title FreelancingComingSoon-glow FreelancingComingSoon-bounce">
          Launching Soon!
        </h1>
        <p className="FreelancingComingSoon-subtitle FreelancingComingSoon-fade-in">
          Get ready for something extraordinary! Join our waitlist now.
        </p>
        <div className="FreelancingComingSoon-form FreelancingComingSoon-slide-up">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="FreelancingComingSoon-input"
          />
          <button
            onClick={handleSubmit}
            className="FreelancingComingSoon-button FreelancingComingSoon-glow-button"
          >
            Join Waitlist
          </button>
        </div>
        <div className="FreelancingComingSoon-description">
          <span className="FreelancingComingSoon-description-heading">Description of Feature</span>
          <span className="FreelancingComingSoon-description-text">
          freelancing is a feature that helps students get hired for skill-based gigs, and And offers opportunity to work as freelancer in renowned companies, And peer to peer projects. With this, students can earn and enhance their work experience portfolio.
          </span>
        </div>
        <div className="FreelancingComingSoon-timer FreelancingComingSoon-slide-up">
          <div className="FreelancingComingSoon-timer-card">
            <span className="FreelancingComingSoon-timer-value">{time.days}</span>
            <span className="FreelancingComingSoon-timer-label">Days</span>
          </div>
          <div className="FreelancingComingSoon-timer-card">
            <span className="FreelancingComingSoon-timer-value">{time.hours}</span>
            <span className="FreelancingComingSoon-timer-label">Hours</span>
          </div>
          <div className="FreelancingComingSoon-timer-card">
            <span className="FreelancingComingSoon-timer-value">{time.minutes}</span>
            <span className="FreelancingComingSoon-timer-label">Minutes</span>
          </div>
          <div className="FreelancingComingSoon-timer-card">
            <span className="FreelancingComingSoon-timer-value">{time.seconds}</span>
            <span className="FreelancingComingSoon-timer-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default FreelancingComingSoon;
