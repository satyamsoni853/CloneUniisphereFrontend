import React from "react";
import { RxCross2 } from "react-icons/rx";
import Logo from "./Unispherelogo.png";
import "./TermsAndCondition.css";
import Background from "../Background/Background";

const TermsAndCondition = () => {
  return (
    <div className="terms-and-condition-main-container">
      <Background/>
      <div className="terms-and-conditions-logo-and-cancel">
        <img className="terms-and-conditions-logo" src={Logo} alt="Logo" />
        {/* <RxCross2 className="terms-and-condition-cross" /> */}
      </div>
      <div className="terms-and-conditons-main-container">
        <h1 className="terms-and-conditons-heading">Terms & Conditions</h1>
      </div>
      <div className="terms-and-condition-text-container">
        <p className="terms-and-condition-text">
          Uniisphere – Terms & Conditions
          <br />
          Last updated: April 5, 2025
          <br />
          Welcome to Uniisphere, a platform built exclusively for college students to connect, learn, and grow. By accessing or using Uniisphere and its features, you agree to the following Terms & Conditions. Please read them carefully.
          <br /><br />
          <strong>1. Acceptance of Terms</strong>
          <br />
          By creating an account or using Uniisphere in any way, you agree to comply with these Terms. If you do not agree, please do not use the app or its services.
          <br /><br />
          <strong>2. Eligibility</strong>
          <br />
          <ul>
            <li>You must be a currently enrolled student at a recognized educational institution.</li>
            <li>You must provide accurate verification during signup.</li>
            <li>You must be at least 18 years old or of legal age in your jurisdiction.</li>
          </ul>
          <br />
          <strong>3. User Conduct</strong>
          <br />
          You agree to:
          <ul>
            <li>Use Uniisphere only for lawful, educational, and social purposes.</li>
            <li>Respect other users’ privacy, dignity, and safety.</li>
            <li>Avoid posting or sharing offensive, harmful, or illegal content.</li>
          </ul>
          <br />
          <strong>4. Account Responsibility</strong>
          <br />
          <ul>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>Any activity under your account is your responsibility.</li>
            <li>Notify us immediately if you suspect unauthorized access.</li>
          </ul>
          <br />
          <strong>5. Content Ownership & Usage</strong>
          <br />
          <ul>
            <li>You retain rights to the content you create (e.g., reviews, posts).</li>
            <li>By uploading content, you grant Uniisphere a non-exclusive, royalty-free license to display and distribute it on the platform.</li>
            <li>You may not copy, scrape, or redistribute content from other users without permission.</li>
            <li>Also not use any kind of data, design or any other thing from Uniisphere.</li>
          </ul>
          <br />
          <strong>6. Data Usage & Privacy</strong>
          <br />
          <ul>
            <li>We collect and use your data in accordance with our Privacy Policy.</li>
            <li>Some features store chat logs, application info, or reading activity to personalize your experience and enforce safety.</li>
          </ul>
          <br />
          <strong>7. Feature-Specific Terms</strong>
          <br />
          <strong>Human Library (Random Student Chat)</strong>
          <ul>
            <li>For verified students only.</li>
            <li>Chats may be monitored or stored for moderation.</li>
            <li>Harassment, abuse, or inappropriate behaviour will result in suspension or ban.</li>
            <li>While chats appear anonymous, moderation data is retained for safety.</li>
          </ul>
          <br />
          <strong>NGO Internships</strong>
          <ul>
            <li>Uniisphere acts only as a facilitator; we do not endorse or guarantee internships.</li>
            <li>You are responsible for providing accurate information in applications.</li>
            <li>All agreements are strictly between you and the NGO.</li>
            <li>You cannot request to delete your application data at any time.</li>
          </ul>
          <br />
          <strong>E-Books Section</strong>
          <ul>
            <li>Reading activity, reviews, and highlights may be public unless privacy settings are adjusted.</li>
            <li>Reviews must be respectful and authentic.</li>
            <li>Content is for personal, non-commercial use only.</li>
            <li>Users must not upload pirated or illegal material.</li>
            <li>Neither should scrape and use books from Uniisphere. If done there will be legal actions taken.</li>
          </ul>
          <br />
          <strong>Mentorship</strong>
          <ul>
            <li>The Mentorship feature connects students with peer or senior mentors within their institution, Skills and Interest.</li>
            <li>All participants must be respectful, honest, and professional in communication.</li>
            <li>Mentorship relationships are voluntary and not monitored unless reported.</li>
            <li>Any abuse, harassment, or misuse may result in removal from the program or app penalties.</li>
            <li>Users can opt out of mentorship at any time via settings or by contacting support.</li>
          </ul>
          <br />
          <strong>8. Suspension & Termination</strong>
          <br />
          We reserve the right to suspend or terminate accounts that:
          <ul>
            <li>Violate these Terms</li>
            <li>Are involved in abusive, fraudulent, or harmful behaviour</li>
            <li>Attempt to exploit or manipulate the platform</li>
          </ul>
          <br />
          <strong>9. Disclaimer of Warranties</strong>
          <br />
          Uniisphere is provided “as is” and “as available.” We do not guarantee uninterrupted or error-free service.
          <br /><br />
          <strong>10. Limitation of Liability</strong>
          <br />
          Uniisphere is not liable for:
          <ul>
            <li>User-generated content</li>
            <li>Outcomes of internship applications</li>
            <li>Third-party actions</li>
            <li>Data loss or damage</li>
          </ul>
          <br />
          <strong>11. Changes to Terms</strong>
          <br />
          We may update these Terms from time to time. Continued use of Uniisphere after changes means you accept the new terms.
          <br /><br />
          <strong>12. Contact Us</strong>
          <br />
          If you have questions about these Terms, reach out at:
          <br />
          📧 support@uniisphere.app
        </p>
      </div>
    </div>
  );
};

export default TermsAndCondition;