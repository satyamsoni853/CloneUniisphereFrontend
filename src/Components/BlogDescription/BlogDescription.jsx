import { useEffect, useState } from "react";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import "./BlogDescription.css";
import BlogImage from "./blogdescription.svg";
import MobileFooter from "../Mobilefooter/MobileFooter";
export default function BlogDescription() {
  const posts = [
    {
      imageSrc: BlogImage,
      title: "The June Revise",
      date: "24-04-2025",
      text: "We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?",
    },
    {
      imageSrc: BlogImage,
      title: "Mr. Survivor of Steal",
      date: "24-04-2025",
      text: "We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?",
    },
    {
      imageSrc: BlogImage,
      title: "2019 Era V/S 2025 Era",
      date: "24-04-2025",
      text: "We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?",
    },
  ];
  const [showDefault, setShowDefault] = useState(true);
  const [showSingleBlog, setShowSingleBlog] = useState(false);

  const post = {
    imageSrc: BlogImage,
    title: "The June Revise",
    date: "24-04-2025",
    text: " We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?"


  };

  const [isMobile, setIsMobile] = useState(false);

  // setting up the text as per the window
  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth <= 500) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 200);
  }, [window.innerWidth]);

  return (
    <>
      <div className="blog-description-desktop-navbar">
        <DesktopNavbar />
      </div>
      <div className="blog-description-mobile-navbar">
        <MobileNavbar />
      </div>
      {/* Blog list section **/}
      <div className="blog-description-page">
        <h1 className="blog-description-title">Your Blog</h1>
        {showDefault && (
          <div className="blog-description-cards-container">
            {posts.map((post, index) => (
              <div
                onClick={() => {
                  setShowDefault(false)
                  setShowSingleBlog(true)
                }}
                key={index} className="blog-description-card">
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  className="blog-description-card-image"
                />
                <div className="blog-description-card-content">
                  <div className="blog-description-card-header">
                    <h2 className="blog-description-card-title">
                      {post.title}
                    </h2>
                    <span className="blog-description-card-date">
                      {post.date}
                    </span>
                  </div>
                  <p className="blog-description-card-text">
                    {isMobile ? post.text.slice(0, 120) : post.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* single blog section*/}
        {showSingleBlog && (
          <div className="single-blog-section-page">
            <div className="single-blog-section-card">
              <img
                src={post.imageSrc}
                alt={post.title}
                className="single-blog-section-card-image"
              />
              <div className="single-blog-section-card-content">
                <div className="single-blog-section-card-header">
                  <h2 className="single-blog-section-card-title">
                    {post.title}
                  </h2>
                  <span className="single-blog-section-card-date">
                    {post.date}
                  </span>
                </div>
                <p className="single-blog-section-card-text">{post.text}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
