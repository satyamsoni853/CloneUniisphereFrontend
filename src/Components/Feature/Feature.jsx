import React, { useRef, useEffect, useState } from "react";
import "./Feature.css"; // Import the CSS file for styling
import { ChevronDown, ChevronUp } from "lucide-react";

function Feature() {
  const [isOpen, setIsOpen] = useState(false); // Feedback form visibility
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
  const [feedbackText, setFeedbackText] = useState(""); // First textarea
  const [problemText, setProblemText] = useState(""); // Second textarea
  const [selectedEmoji, setSelectedEmoji] = useState(null); // Track selected emoji
  const [error, setError] = useState(""); // Error message for validation
  const featureRef = useRef(null); // Ref for the feature container

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featureRef.current && !featureRef.current.contains(event.target)) {
        setIsOpen(false); // Close the feature box if clicked outside
        setIsSubmitted(false); // Reset submission state
        setFeedbackText(""); // Reset feedback text
        setProblemText(""); // Reset problem text
        setSelectedEmoji(null); // Reset emoji
        setError(""); // Reset error
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Validate character count (minimum 15 characters)
  const validateCharCount = (text) => {
    return text.length >= 15;
  };

  // Handle emoji click
  const handleEmojiClick = (emotion) => {
    setSelectedEmoji(emotion);
    setError("Please provide at least 15 characters in both text fields.");
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (!selectedEmoji) {
      setError("Please select an emoji.");
      return;
    }
    if (!validateCharCount(feedbackText) || !validateCharCount(problemText)) {
      setError("Both text fields must contain at least 15 characters.");
      return;
    }

    setIsSubmitted(true); // Show thank-you message
    setTimeout(() => {
      setIsOpen(false); // Close the form after 2 seconds
      setIsSubmitted(false); // Reset submission state
      setFeedbackText(""); // Reset feedback text
      setProblemText(""); // Reset problem text
      setSelectedEmoji(null); // Reset emoji
      setError(""); // Reset error
    }, 2000);
  };

  return (
    <div ref={featureRef} className="feature-container">
      <div
        className="feature-messages-widget"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsSubmitted(false); // Reset submission state when toggling
          setError(""); // Reset error
        }}
      >
        <span className="feature-messages-text">FeedBack</span>
        <span className="feature-icon">
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </span>
      </div>

      {/* Feedback Form or Thank You Message */}
      {isOpen && (
        <div className="desktop-feedback-container">
          {isSubmitted ? (
            <div className="desktop-feedback-thankyou">
              <h2>Thanks for the feedback!</h2>
            </div>
          ) : (
            <>
              <div className="desktop-feedback-header">
                <h1>
                  We'd love your feedback! Would you like to take a quick one-step
                  survey?
                </h1>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                    setFeedbackText("");
                    setProblemText("");
                    setSelectedEmoji(null);
                    setError("");
                  }}
                  className="desktop-feedback-close-btn"
                  aria-label="Close feedback form"
                >
                  ×
                </button>
              </div>
              <div className="desktop-feedback-emojis">
                {[
                  { emoji: "😔", emotion: "Very Bad" },
                  { emoji: "☹️", emotion: "Bad" },
                  { emoji: "😐", emotion: "Neutral" },
                  { emoji: "🙂", emotion: "Nice" },
                  { emoji: "🤩", emotion: "Excellent" },
                ].map(({ emoji, emotion }) => (
                  <div
                    key={emotion}
                    className={`desktop-feedback-emoji-btn ${
                      selectedEmoji === emotion ? "selected" : ""
                    }`}
                    onClick={() => handleEmojiClick(emotion)}
                    role="button"
                    aria-label={`Rate as ${emotion}`}
                  >
                    <span className="desktop-feedback-emoji">{emoji}</span>
                    <span className="desktop-feedback-emoji-emotions">
                      {emotion}
                    </span>
                  </div>
                ))}
              </div>
              {error && <div className="desktop-feedback-error">{error}</div>}
              <div className="desktop-feedback-textarea-container">
                <label
                  htmlFor="desktop-feedback-textarea-1"
                  className="desktop-feedback-label"
                >
                  Your feedback (minimum 15 characters)
                </label>
                <textarea
                  id="desktop-feedback-textarea-1"
                  className="desktop-feedback-textarea"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter at least 15 characters..."
                  aria-describedby={error ? "error-message" : undefined}
                ></textarea>
                <div className="char-count">
                  {feedbackText.length} / 15 characters
                </div>
              </div>
              <div className="desktop-feedback-textarea-container">
                <label
                  htmlFor="desktop-feedback-textarea-2"
                  className="desktop-feedback-label"
                >
                  Problem you are facing and the right solution (minimum 15 characters)
                </label>
                <textarea
                  id="desktop-feedback-textarea-2"
                  className="desktop-feedback-textarea"
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="Enter at least 15 characters..."
                  aria-describedby={error ? "error-message" : undefined}
                ></textarea>
                <div className="char-count">
                  {problemText.length} / 15 characters
                </div>
              </div>
              <div className="desktop-feedback-buttons">
                <button
                  className="desktop-feedback-cancel-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                    setFeedbackText("");
                    setProblemText("");
                    setSelectedEmoji(null);
                    setError("");
                  }}
                  aria-label="Cancel feedback"
                >
                  Cancel
                </button>
                <button
                  className="desktop-feedback-submit-btn"
                  onClick={handleSubmit}
                  aria-label="Submit feedback"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Feature;