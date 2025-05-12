import { useState, useEffect } from "react";
import "./CommunityComingSoon.css";
import Background from "../Background/Background.jsx";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";

function CommunityComingSoon() {
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
      <div className="CommunityComingSoon-container-navbar">
        <DesktopNavbar />
      </div>
      <div className="CommunityComingSoon-container">
        <div className="CommunityComingSoon-container-background">
          <Background />
        </div>

        <div className="CommunityComingSoon-content">
          <div className="FreenlancingComingSoon-main-heading">Community</div>
          <h1 className="CommunityComingSoon-title CommunityComingSoon-glow CommunityComingSoon-bounce">
            Launching Soon!
          </h1>
          <p className="CommunityComingSoon-subtitle CommunityComingSoon-fade-in">
            Get ready for something extraordinary! Join our waitlist now.
          </p>
          <div className="CommunityComingSoon-form CommunityComingSoon-slide-up">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="CommunityComingSoon-input"
            />
            <button
              onClick={handleSubmit}
              className="CommunityComingSoon-button CommunityComingSoon-glow-button"
            >
              Join Waitlist
            </button>
          </div>
          <div className="CommunityComingSoon-description">
            <span className="CommunityComingSoon-description-heading">
              Description of Feature
            </span>
            <span className="CommunityComingSoon-description-text">
         Community is a feature which helps students Join interest-based on forums, study groups, and club-like spaces where you can connect with like-minded peers and students. Collaborate effortlessly with built-in tools for group projects, and make learning and networking more fun and productive.
            </span>
          </div>
          <div className="CommunityComingSoon-timer CommunityComingSoon-slide-up">
            <div className="CommunityComingSoon-timer-card">
              <span className="CommunityComingSoon-timer-value">
                {time.days}
              </span>
              <span className="CommunityComingSoon-timer-label">Days</span>
            </div>
            <div className="CommunityComingSoon-timer-card">
              <span className="CommunityComingSoon-timer-value">
                {time.hours}
              </span>
              <span className="CommunityComingSoon-timer-label">Hours</span>
            </div>
            <div className="CommunityComingSoon-timer-card">
              <span className="CommunityComingSoon-timer-value">
                {time.minutes}
              </span>
              <span className="CommunityComingSoon-timer-label">Minutes</span>
            </div>
            <div className="CommunityComingSoon-timer-card">
              <span className="CommunityComingSoon-timer-value">
                {time.seconds}
              </span>
              <span className="CommunityComingSoon-timer-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityComingSoon;
