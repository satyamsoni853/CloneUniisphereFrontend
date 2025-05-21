import React from "react";
import "./FreelancingSection.css";
import { Link } from "react-router-dom";
import { IoArrowForward, IoSearch } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'
import Background from "../Background/Background.jsx";




function FreelancingSection() {
  // dummy data
  const users = [
    {
      fullName: "Aarav Sharma",
      occupation: "Frontend Designer",
      description:
        "Creative mind with a passion for responsive web layouts and clean UI.",
      profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      fullName: "Meera Patel",
      occupation: "Backend Developer",
      description:
        "Loves working with APIs, databases, and making servers dance.",
      profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      fullName: "Rohit Verma",
      occupation: "Full Stack Developer",
      description:
        "Handles frontend and backend with equal finesse and love for clean code.",
      profilePic: "https://randomuser.me/api/portraits/men/31.jpg",
    },
    {
      fullName: "Sneha Roy",
      occupation: "UI/UX Designer",
      description:
        "Focused on user-centric designs with smooth interactions and clean aesthetics.",
      profilePic: "https://randomuser.me/api/portraits/women/41.jpg",
    },
    {
      fullName: "Karan Mehta",
      occupation: "DevOps Engineer",
      description:
        "Bridges the gap between development and operations with automation.",
      profilePic: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      fullName: "Priya Singh",
      occupation: "Mobile App Developer",
      description:
        "Builds cross-platform mobile apps with performance and beauty in mind.",
      profilePic: "https://randomuser.me/api/portraits/women/61.jpg",
    },
    {
      fullName: "Priya Singh",
      occupation: "Mobile App Developer",
      description:
        "Builds cross-platform mobile apps with performance and beauty in mind.",
      profilePic: "https://randomuser.me/api/portraits/women/61.jpg",
    },
    {
      fullName: "Priya Singh",
      occupation: "Mobile App Developer",
      description:
        "Builds cross-platform mobile apps with performance and beauty in mind.",
      profilePic: "https://randomuser.me/api/portraits/women/61.jpg",
    },
];

const backgroundUserColor=["#DB3E3933","#E2CF814D","#2B9DA733","#A07A974D","#80898E4D"]

  return (
    <>
    <div className="Another-freelancing-section-desktop-navbar-and-background">
      <DesktopNavbar/>
      <Background/>
    </div>

    <div className="Another-freelancing-section">
      {/* Navigation Links */}
      <div className="Another-freelancing-section-nav">
        <Link className="Another-freelancing-section-nav-item">Find Gigs</Link>
        <Link className="Another-freelancing-section-nav-item">Post Gigs</Link>
        <Link className="Another-freelancing-section-nav-item">About</Link>
      </div>

      {/* Header Section */}
      <div className="Another-freelancing-section-header">
        <h1 className="Another-freelancing-section-title">Freelancing</h1>
        <h1 className="Another-freelancing-section-main-heading">
          Boost your Experience With freelancing
        </h1>
      </div>

      {/* Search Bar Section */}
      <div className="Another-freelancing-section-search-bar">
        <div className="Another-freelancing-section-search-container">
          <input
            type="text"
            placeholder="Search for any service"
            className="Another-freelancing-section-search-input"
          />
          <div className="Another-freelancing-section-search-icon">
          
            <IoSearch  className="Another-freelancing-section-icon" /> 
          </div>
        </div>
        <button className="Another-freelancing-section-filter-button">
          All Filter <IoFilter  className="Another-freelancing-section-icon" />
        </button>
      </div>

      {/* Category Buttons Section */}
      <div className="Another-freelancing-section-categories">
        <button className="Another-freelancing-section-category-button">
          UI/UX Designer
        </button>
        <button className="Another-freelancing-section-category-button">
          Front End
        </button>
        <button className="Another-freelancing-section-category-button">
          Back End
        </button>
        <button className="Another-freelancing-section-category-button">
          Graphic Designer
        </button>
      </div>

      {/* Top Projects Section */}
      <h1 className="Another-freelancing-section-top-projects-heading">Top Projects</h1>
      <div className="Another-freelancing-section-top-projectDiv-and-arrow">
        <div className="Another-freelancing-section-top-projects">
          {/* Project Card  */}
          {users.map((user, index) => (
            <div key={index}
            
            style={{
            backgroundColor: backgroundUserColor[index % backgroundUserColor.length]
            }}
            className="Another-freelancing-section-project-card">
              <div className="Another-freelancing-section-card-top">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="Another-freelancing-section-profile-image"
                />
                <h2 className="Another-freelancing-section-project-name">
                  {user.fullName}
                </h2>
              </div>
              <div className="Another-freelancing-section-card-info">
                <p
                  style={{
                    fontSize: user.occupation.length > 16 ? "18px" : "20px",
                    
                  }}
                  className="Another-freelancing-section-project-title"
                >
                  {user.occupation}
                </p>
                <p className="Another-freelancing-section-project-description">
                  {user.description}
                </p>
              </div>
              <button className="Another-freelancing-section-visit-button">
                Visit
              </button>
            </div>
          ))}

        </div>
          <div className="Another-freelancing-section-project-card-arrow">
            <IoIosArrowForward className="Another-freelancing-section-icon" />
          </div>
      </div>
    </div>
      </>
  );
}

export default FreelancingSection;
