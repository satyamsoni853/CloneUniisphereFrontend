import { useEffect, useState } from "react";
import axios from "axios";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import "./BlogDescription.css";
import BlogImage from "./blogdescription.svg";
import MobileFooter from "../Mobilefooter/MobileFooter";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BlogDescription() {
  const navigate = useNavigate();

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
    {
      imageSrc: BlogImage,
      title: "2019 Era V/S 2025 Era",
      date: "24-04-2025",
      text: "We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?",
    },
  ];

  const [showDefault, setShowDefault] = useState(true);
  const [showSingleBlog, setShowSingleBlog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [blogData, setBlogData] = useState(null);

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Retrieve token and userId from localStorage
        const token =
          localStorage.getItem("token") || localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          console.error("Token or userId not found in local storage");
          return;
        }

        // Make GET request to API with userId in URL
        const response = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/blog/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            timeout: 10000, // 10 seconds timeout
          }
        );

        console.log("API Response:", response.data); // Log the API response
        setBlogData(response.data); // Store response in state (optional)
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []); // Run once on component mount

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const post = {
    imageSrc: BlogImage,
    title: "The June Revise",
    date: "24-04-2025",
    text: " We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey? We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?We’d love your feedback! Would you like to take a quick one-step survey?",
  };

  return (
    <>
      <div className="blog-description-desktop-navbar">
        <DesktopNavbar />
      </div>
      <div className="blog-description-mobile-navbar">
        <MobileNavbar />
      </div>
      {/* Blog list section */}
      <div className="blog-description-page">
        <div className="blog-description-title">
          <span>
            <IoArrowBackCircleOutline
              onClick={() => {
                !showDefault ? setShowDefault(true) : navigate(-1);
              }}
            />
          </span>{" "}
          Your Blog
        </div>
        {showDefault && (
          <div className="blog-description-cards-container">
            {posts.map((post, index) => (
              <div
                onClick={() => {
                  setShowDefault(false);
                  setShowSingleBlog(true);
                }}
                key={index}
                className="blog-description-card"
              >
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
        {/* Single blog section */}
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
      <div className="blog-description-mobile-footer">
        <MobileFooter />
      </div>
    </>
  );
}
