import { useState, useEffect } from "react";
import "./SkillupComingSoon.css";
import Background from '../Background/Background.jsx' 
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'

function SkillupComingSoon() {
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
    <div className="SkillupComingSoon-container-navbar">
    <DesktopNavbar/>
    </div>
    <div className="SkillupComingSoon-container">
    <div className="SkillupComingSoon-container-background">
      <Background/>
    </div>
     
      <div className="SkillupComingSoon-content">
        <div className="FreenlancingComingSoon-main-heading">
            Skillup
        </div>
        <h1 className="SkillupComingSoon-title SkillupComingSoon-glow SkillupComingSoon-bounce">
          Launching Soon!
        </h1>
        <p className="SkillupComingSoon-subtitle SkillupComingSoon-fade-in">
          Get ready for something extraordinary! Join our waitlist now.
        </p>
        <div className="SkillupComingSoon-form SkillupComingSoon-slide-up">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="SkillupComingSoon-input"
          />
          <button
            onClick={handleSubmit}
            className="SkillupComingSoon-button SkillupComingSoon-glow-button"
          >
            Join Waitlist
          </button>
        </div>
        <div className="SkillupComingSoon-description">
          <span className="SkillupComingSoon-description-heading">Description of Feature</span>
          <span className="SkillupComingSoon-description-text">
        Skill-Up offers short, focused courses in different domains  designed as to be quick to complete, pocket friendly, and teaches you skills that you can  monetize, and  get a initial experience for your portfolio.
          </span>
        </div>
        <div className="SkillupComingSoon-timer SkillupComingSoon-slide-up">
          <div className="SkillupComingSoon-timer-card">
            <span className="SkillupComingSoon-timer-value">{time.days}</span>
            <span className="SkillupComingSoon-timer-label">Days</span>
          </div>
          <div className="SkillupComingSoon-timer-card">
            <span className="SkillupComingSoon-timer-value">{time.hours}</span>
            <span className="SkillupComingSoon-timer-label">Hours</span>
          </div>
          <div className="SkillupComingSoon-timer-card">
            <span className="SkillupComingSoon-timer-value">{time.minutes}</span>
            <span className="SkillupComingSoon-timer-label">Minutes</span>
          </div>
          <div className="SkillupComingSoon-timer-card">
            <span className="SkillupComingSoon-timer-value">{time.seconds}</span>
            <span className="SkillupComingSoon-timer-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default SkillupComingSoon;
