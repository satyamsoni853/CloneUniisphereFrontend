import { useState, useEffect } from "react";
import "./ComingSoon.css";
import Background from '../Background/Background.jsx' 
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'

function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(Subscribed with ${email}! Get ready for the big reveal!);
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
    <div className="ComingSoon-container-navbar">
    <DesktopNavbar/>
    </div>
    <div className="ComingSoon-container">
    <div className="ComingSoon-container-background">
      <Background/>
    </div>
      <div className="ComingSoon-particles"></div>
      <div className="ComingSoon-content">
        <h1 className="ComingSoon-title ComingSoon-glow ComingSoon-bounce">
          Launching Soon!
        </h1>
        <p className="ComingSoon-subtitle ComingSoon-fade-in">
          Get ready for something extraordinary! Join our waitlist now.
        </p>
        <div className="ComingSoon-form ComingSoon-slide-up">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ComingSoon-input"
          />
          <button
            onClick={handleSubmit}
            className="ComingSoon-button ComingSoon-glow-button"
          >
            Join Waitlist
          </button>
        </div>
        <div className="ComingSoon-timer ComingSoon-slide-up">
          <div className="ComingSoon-timer-card">
            <span className="ComingSoon-timer-value">{time.days}</span>
            <span className="ComingSoon-timer-label">Days</span>
          </div>
          <div className="ComingSoon-timer-card">
            <span className="ComingSoon-timer-value">{time.hours}</span>
            <span className="ComingSoon-timer-label">Hours</span>
          </div>
          <div className="ComingSoon-timer-card">
            <span className="ComingSoon-timer-value">{time.minutes}</span>
            <span className="ComingSoon-timer-label">Minutes</span>
          </div>
          <div className="ComingSoon-timer-card">
            <span className="ComingSoon-timer-value">{time.seconds}</span>
            <span className="ComingSoon-timer-label">Seconds</span>
          </div>
        </div>
        <div className="ComingSoon-description">
          <span className="ComingSoon-description-heading">Description of Feature</span>
          <span className="ComingSoon-description-text">
            Internzone hooks you up with real internships from startups,
            renowned Companies , NGOs, and student ventures which are matched to
            your skills, interests, and goals. These internships are also
            remote-friendly, verified, and built to boost your experience before
            you even graduate.
          </span>
        </div>
      </div>
    </div>

    </>
  );
}

export default ComingSoon;