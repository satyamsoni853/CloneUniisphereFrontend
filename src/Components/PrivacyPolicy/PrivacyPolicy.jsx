import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Logo from "./Unispherelogo.png";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="user-agreement-main-container">
      <div className="user-agreement-logo-and-cancel">
        <img className="user-agreement-logo" src={Logo} alt="Logo" />
        {/* <RxCross2 className="user-agreement-cross" /> */}
      </div>
      <div className="terms-and-conditions-main-container">
        <h1 className="terms-and-conditions-heading">User Agreement</h1>
      </div>
      <div className="user-agreement-text-container">
        <p className="user-agreement-text">
          Uniisphere User Agreement
          <br />
          Effective Date: April 5, 2025
          <br />
          Welcome to Uniisphere — a social learning platform exclusively built for college students. This User Agreement (“Agreement”) outlines your rights, responsibilities, and relationship with Uniisphere. By using our services, you agree to this Agreement in full.
          <br /><br />
          <strong>1. Eligibility</strong>
          <br />
          You may only use Uniisphere if you are:
          <ul>
            <li>A current student enrolled at a recognized educational institution</li>
            <li>Able to verify your identity through a college-issued email or other accepted method</li>
            <li>At least 18 years old or of legal age in your jurisdiction</li>
          </ul>
          <br />
          <strong>2. Your Responsibilities</strong>
          <br />
          By using Uniisphere, you agree to:
          <ul>
            <li>Provide accurate, truthful information during signup and usage</li>
            <li>Treat others with respect and dignity, both in public and private features</li>
            <li>Follow all applicable laws, university codes, and this Agreement</li>
            <li>Use the app solely for non-commercial, student-focused purposes</li>
          </ul>
          You may not:
          <ul>
            <li>Impersonate other individuals or submit false verification documents</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Upload illegal, harmful, or copyrighted content</li>
            <li>Attempt to reverse-engineer, hack, or interfere with the platform’s services</li>
          </ul>
          <br />
          <strong>3. Content Ownership & Use</strong>
          <br />
          <ul>
            <li>You own the content you create (e.g. messages, posts, reviews), but by uploading it to Uniisphere, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and moderate it within the app.</li>
            <li>We do not sell your personal content to third parties.</li>
            <li>Uniisphere reserves the right to remove or moderate content that violates this Agreement.</li>
          </ul>
          <br />
          <strong>4. Feature Usage</strong>
          <br />
          Uniisphere includes features like:
          <ul>
            <li>Human Library: A student-only anonymous chat space</li>
            <li>NGO Internships: A discovery and application tool for verified students</li>
            <li>E-Books: Reading, reviewing, and sharing academic or leisure titles</li>
            <li>Mentorship: Connecting students with senior peers for guidance</li>
          </ul>
          Each feature has additional rules outlined in our Terms & Conditions, which you also agree to by using Uniisphere.
          <br /><br />
          <strong>5. Data Collection & Privacy</strong>
          <br />
          <ul>
            <li>We collect necessary data to operate the app safely and efficiently, as described in our Privacy Policy</li>
            <li>Your    Your data is never sold, and third-party sharing is minimal and consent-based</li>
            <li>You can request data deletion or account termination by contacting support</li>
          </ul>
          <br />
          <strong>6. Suspension or Termination</strong>
          <br />
          We reserve the right to suspend, restrict, or terminate accounts that:
          <ul>
            <li>Violate this Agreement or any of our policies</li>
            <li>Harm other users or the platform</li>
            <li>Engage in fraudulent or manipulative behavior</li>
          </ul>
          <br />
          <strong>7. Limitation of Liability</strong>
          <br />
          Uniisphere is a student-oriented platform that facilitates connections and opportunities. We do not guarantee:
          <ul>
            <li>Matches or responses in mentorship or chat features</li>
            <li>Internship placements or experiences</li>
            <li>Complete accuracy of user-submitted content</li>
          </ul>
          Use Uniisphere at your own discretion and risk.
          <br /><br />
          <strong>8. Agreement Changes</strong>
          <br />
          We may update this Agreement periodically. Continued use of Uniisphere after changes constitutes your acceptance of the new terms.
          <br /><br />
          <strong>9. Contact</strong>
          <br />
          For questions, support, or disputes, reach out to us at:
          <br />
          📧 support@uniisphere.app
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;