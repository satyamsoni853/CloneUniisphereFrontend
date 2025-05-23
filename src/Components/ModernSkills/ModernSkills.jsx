 
import "./ModernSkills.css";
import ModernImage from "./ModernImage.svg";
import ModernImage2 from "./ModernImage2.svg";
import ModernImage3 from "./ModernImage3.svg";
import ModernImage4 from "./ModernImage4.svg";
import ModernImage5 from "./ModernImage5.svg";
import { IoFilter, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";






const ModernSkills = () => {
  return (

  <>
  <div className="Modern-Skills-section-NavBar">
    <DesktopNavbar/>
    <Background/>
  </div>
    <div className="Modern-Skills-main-container">
     <div className="Modern-Skills-section-search-bar">
        <div className="Modern-Skills-section-search-container">
          <input
            type="text"
            placeholder="Search for any service"
            className="Modern-Skills-section-search-input"
          />
          <div className="Modern-Skills-section-search-icon">
            <IoSearch />
          </div>
        </div>
        <button className="Modern-Skills-section-filter-button">
          All Filter <IoFilter />
        </button>

        <Link className="Modern-Skills-section-nav-link">
          Post Internship
        </Link>
        <Link className="Modern-Skills-section-nav-link">About</Link>
      </div>
      <div className="Modern-Skills-heading-and-buttons-section">
        <button className="Modern-Skills-First-btn">
          Best App for Skill Up
        </button>
        <div className="Modern-Skills-heading-container">
          <h2>
            Your Modern <span>Online</span>
          </h2>
          <h2>College Skills</h2>
        </div>
        <button className="Modern-Skills-Second-btn">Explore</button>
        <div className="Modern-Skills-section-ellipse"></div>
      </div>
      <div className="Modern-Skills-small-div-container">
        <div className="Modern-Skills-small-div">
          <div className="Modern-Skills-hook-div">
            <div className="Modern-Skills-hook-circle"></div>
          </div>
          <div className="Modern-Skills-div-image">
            <img src={ModernImage} alt="ModernImage" />
          </div>
          <div className="Modern-Skills-div-heading">
            <h1>UI/UX Designing</h1>
            <h2>in there respective fields. which is to be arise ......</h2>
          </div>
        </div>
        <div className="Modern-Skills-small-div-2">
          <div className="Modern-Skills-hook-div">
            <div className="Modern-Skills-hook-circle"></div>
          </div>
          <div className="Modern-Skills-div-image">
            <img src={ModernImage} alt="ModernImage" />
          </div>
          <div className="Modern-Skills-div-heading">
            <h1>UI/UX Designing</h1>
            <h2>in there respective fields. which is to be arise ......</h2>
          </div>
        </div>
        <div className="Modern-Skills-small-div-3">
          <div className="Modern-Skills-hook-div">
            <div className="Modern-Skills-hook-circle"></div>
          </div>
          <div className="Modern-Skills-div-image">
            <img src={ModernImage} alt="ModernImage" />
          </div>
          <div className="Modern-Skills-div-heading">
            <h1>Front-End</h1>
            <h2>in there respective fields. which is to be arise ......</h2>
          </div>
        </div>
        <div className="Modern-Skills-small-div-4">
          <div className="Modern-Skills-hook-div">
            <div className="Modern-Skills-hook-circle"></div>
          </div>
          <div className="Modern-Skills-div-image">
            <img src={ModernImage} alt="ModernImage" />
          </div>
          <div className="Modern-Skills-div-heading">
            <h1>Back-End</h1>
            <h2>in there respective fields. which is to be arise ......</h2>
          </div>
        </div>
        <div className="Modern-Skills-small-div-5">
          <div className="Modern-Skills-hook-div">
            <div className="Modern-Skills-hook-circle"></div>
          </div>
          <div className="Modern-Skills-div-image">
            <img src={ModernImage} alt="ModernImage" />
          </div>
          <div className="Modern-Skills-div-heading">
            <h1>UI/UX Designing</h1>
            <h2>in there respective fields. which is to be arise ......</h2>
          </div>
        </div>
      </div>
      <div className="Modern-Skills-parent-main-heading">
        Get the glittering courses of your respective niche. From the top
        experts of the field.Get the glittering courses of your respective
        niche. From the top experts of the field.
      </div>
    </div>
  </>
  );
};

export default ModernSkills;
