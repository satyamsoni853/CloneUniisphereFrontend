import { useState, useEffect } from "react";
import "./EventsComingSoon.css";
import Background from "../Background/Background.jsx";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";

function EventsComingSoon() {
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
      <div className="EventsComingSoon-container-navbar">
        <DesktopNavbar />
      </div>
      <div className="EventsComingSoon-container">
        <div className="EventsComingSoon-container-background">
          <Background />
        </div>

        <div className="EventsComingSoon-content">
          <div className="FreenlancingComingSoon-main-heading">Events</div>
          <h1 className="EventsComingSoon-title EventsComingSoon-glow EventsComingSoon-bounce">
            Launching Soon!
          </h1>
          <p className="EventsComingSoon-subtitle EventsComingSoon-fade-in">
            Get ready for something extraordinary! Join our waitlist now.
          </p>
          <div className="EventsComingSoon-form EventsComingSoon-slide-up">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="EventsComingSoon-input"
            />
            <button
              onClick={handleSubmit}
              className="EventsComingSoon-button EventsComingSoon-glow-button"
            >
              Join Waitlist
            </button>
          </div>
          <div className="EventsComingSoon-description">
            <span className="EventsComingSoon-description-heading">
              Description of Feature
            </span>
            <span className="EventsComingSoon-description-text">
          Events is a feature which helps students Discover exciting events happening across universities and industries—be it fests, webinars, or competitions! Register, dive in, and gain certificates, badges, and network-building opportunities that’ll make your profile stand out and open doors to future opportunities.
            </span>
          </div>
          <div className="EventsComingSoon-timer EventsComingSoon-slide-up">
            <div className="EventsComingSoon-timer-card">
              <span className="EventsComingSoon-timer-value">
                {time.days}
              </span>
              <span className="EventsComingSoon-timer-label">Days</span>
            </div>
            <div className="EventsComingSoon-timer-card">
              <span className="EventsComingSoon-timer-value">
                {time.hours}
              </span>
              <span className="EventsComingSoon-timer-label">Hours</span>
            </div>
            <div className="EventsComingSoon-timer-card">
              <span className="EventsComingSoon-timer-value">
                {time.minutes}
              </span>
              <span className="EventsComingSoon-timer-label">Minutes</span>
            </div>
            <div className="EventsComingSoon-timer-card">
              <span className="EventsComingSoon-timer-value">
                {time.seconds}
              </span>
              <span className="EventsComingSoon-timer-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsComingSoon;
