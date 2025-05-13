import { useState, useEffect } from "react";
import "./MentorshipComingSoon.css";
import Background from "../Background/Background.jsx";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";

function MentorshipComingSoon() {
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
      <div className="MentorshipComingSoon-container-navbar">
        <DesktopNavbar />
      </div>
      <div className="MentorshipComingSoon-container">
        <div className="MentorshipComingSoon-container-background">
          <Background />
        </div>

        <div className="MentorshipComingSoon-content">
          <div className="FreenlancingComingSoon-main-heading">Mentorship</div>
          <h1 className="MentorshipComingSoon-title MentorshipComingSoon-glow MentorshipComingSoon-bounce">
            Launching Soon!
          </h1>
          <p className="MentorshipComingSoon-subtitle MentorshipComingSoon-fade-in">
            Get ready for something extraordinary! Join our waitlist now.
          </p>
          <div className="MentorshipComingSoon-form MentorshipComingSoon-slide-up">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="MentorshipComingSoon-input"
            />
            <button
              onClick={handleSubmit}
              className="MentorshipComingSoon-button MentorshipComingSoon-glow-button"
            >
              Join Waitlist
            </button>
          </div>
          <div className="MentorshipComingSoon-description">
            <span className="MentorshipComingSoon-description-heading">
              Description of Feature
            </span>
            <span className="MentorshipComingSoon-description-text">
              Mentorship hooks you up with real internships from startups,
              renowned Companies , NGOs, and student ventures which are matched
              to your skills, interests, and goals. These internships are also
              remote-friendly, verified, and built to boost your experience
              before you even graduate.
            </span>
          </div>
          <div className="MentorshipComingSoon-timer MentorshipComingSoon-slide-up">
            <div className="MentorshipComingSoon-timer-card">
              <span className="MentorshipComingSoon-timer-value">
                {time.days}
              </span>
              <span className="MentorshipComingSoon-timer-label">Days</span>
            </div>
            <div className="MentorshipComingSoon-timer-card">
              <span className="MentorshipComingSoon-timer-value">
                {time.hours}
              </span>
              <span className="MentorshipComingSoon-timer-label">Hours</span>
            </div>
            <div className="MentorshipComingSoon-timer-card">
              <span className="MentorshipComingSoon-timer-value">
                {time.minutes}
              </span>
              <span className="MentorshipComingSoon-timer-label">Minutes</span>
            </div>
            <div className="MentorshipComingSoon-timer-card">
              <span className="MentorshipComingSoon-timer-value">
                {time.seconds}
              </span>
              <span className="MentorshipComingSoon-timer-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MentorshipComingSoon;
