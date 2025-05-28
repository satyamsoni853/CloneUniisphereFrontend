import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MobileFooter.css";

import AddBlack from "./AddBlackIcon.svg";
import AddWhite from "./AddWhiteIcon.svg";
import NetworkBlack from "./NetworkBlackIcon.svg";
import NetworkWhite from "./NetworkWhiteIcon.svg";
import ClenderBlack from "./ClenderBlackIcon.svg";
import ClenderWhite from "./ClenderWhiteIcon.svg";
import HomeWhite from "./HomewhiteIcon.svg";
import HomeBlack from "./HomeblackIcon.svg";
import NotificationWhite from "./NotificationWhiteIcon.svg";
import NotificationBlack from "./NotificationBlackIcon.svg";
import UserIconBlack from "./UserIcon.svg";
import UserIconWhite from "./UserIcon.svg";

function MobileFooter() {
  const [showNetwork, setShowNetwork] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [showAddMore, setShowAddMore] = useState(true);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mentions, setMentions] = useState([]);
  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [homeActive, setHomeActive] = useState(true);
  const [notificationActive, setNotificationActive] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);
  const [networkActive, setNetworkActive] = useState(false);
  const [userActive, setUserActive] = useState(false);

  const userId = localStorage.getItem("userId");

  // Toggle icon states
  const toggleIcon = (iconName) => {
    setHomeActive(iconName === "home");
    setNotificationActive(iconName === "notification");
    setAddActive(iconName === "add");
    setCalendarActive(iconName === "calendar");
    setNetworkActive(iconName === "network");
    setUserActive(iconName === "user");
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !userId) {
        setError("Authentication required");
        return;
      }
      try {
        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/posts",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (
          response.data?.totalPosts &&
          Array.isArray(response.data.totalPosts) &&
          response.data.totalPosts.length > 0
        ) {
          const userPosts = response.data.totalPosts.filter(
            (post) => post.user?.id === userId
          );
          if (userPosts.length > 0 && userPosts[0].user) {
            setUsername(userPosts[0].user.username || "User");
            setUserProfileImage(userPosts[0].user.profilePictureUrl || "");
          } else {
            setError("No user posts found");
          }
        } else {
          setError("No posts available");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile");
      }
    };
    fetchUserProfile();
  }, [userId]);

  // Clean up media URLs
  useEffect(() => {
    return () => {
      mediaList.forEach((media) => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

  // Reset showNetwork on component unmount
  useEffect(() => {
    return () => {
      setShowNetwork(false);
    };
  }, []);

  const handleCloseUpload = () => {
    setShowUploadSection(false);
    setMediaList([]);
    setShowAddMore(true);
    setShowPostDetails(false);
    setCaption("");
    setLocation("");
    setHideLikes(false);
    setDisableComments(false);
    setMentions([]);
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList((prev) => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
          },
        ]);
      }
    });
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList((prev) => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
          },
        ]);
      }
    });
  };

  const handleAddMention = () => {
    console.log("Add mention clicked");
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      const formData = new FormData();
      mediaList.forEach((media) => {
        formData.append("media", media.file);
      });

      formData.append("content", caption);
      formData.append("userId", userId);
      formData.append("visibility", (!hideLikes).toString());
      formData.append("location", location || "");
      formData.append("tags", mentions.join(","));

      const postResponse = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/posts",
        formData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("Post created:", postResponse.data);
      handleCloseUpload();
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error, error?.response?.data);
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoClick = () => {
    if (!userId) {
      setError("Please log in to access your profile");
      navigate("/login");
      return;
    }
    toggleIcon("user");
    navigate(`/ProfileEditSection/${userId}`);
  };

  return (
    <div className="mobile-footer">
      {error && <div className="error-message-footer"></div>}
      <div className="mobile-footer-container">
        <Link to="/View">
          <img
            src={homeActive ? HomeBlack : HomeWhite}
            alt="Home"
            className={`mobile-footer-icon ${homeActive ? "active" : ""}`}
            onClick={() => toggleIcon("home")}
          />
        </Link>
        <div>
          <img
            src={networkActive ? NetworkBlack : NetworkWhite}
            alt="Network"
            className={`mobile-footer-icon ${networkActive ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleIcon("network");
              setShowNetwork(!showNetwork);
            }}
          />
        </div>
        <img
          src={addActive ? AddBlack : AddWhite}
          alt="Add"
          className={`mobile-footer-icon mobile-footer-add-icon ${
            addActive ? "active" : ""
          }`}
          onClick={() => {
            toggleIcon("add");
            setShowUploadSection(true);
          }}
        />
        <Link to="/Notifications">
          <img
            src={notificationActive ? NotificationBlack : NotificationWhite}
            alt="Notification"
            className={`mobile-footer-icon ${notificationActive ? "active" : ""}`}
            onClick={() => toggleIcon("notification")}
          />
        </Link>
        <div>
          <img
            src={userActive ? UserIconBlack : UserIconWhite}
            alt="User"
            className={`mobile-footer-icon ${userActive ? "active" : ""}`}
            onClick={handleLogoClick}
          />
        </div>
      </div>
      {showNetwork && (
        <div className="mobile-connections-card">
          <div className="mobile-connections-item mobile-connection-connection">
            <Link to="/NetworkPage" className="connection-link" onClick={() => setShowNetwork(false)}>
              Connection
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/Books" className="connection-link" onClick={() => setShowNetwork(false)}>
              Eduvault
            </Link>
          </div>
          <div className="mobile-connections-item active">
            <Link to="/HumanLib" className="connection-link" onClick={() => setShowNetwork(false)}>
              Human Library
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/libblog" className="connection-link" onClick={() => setShowNetwork(false)}>
              Blog
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/MentorshipComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              MentorShip
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/SkillupComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              Skillup
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/FreelancingComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              Freelancing
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/InternzoneComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              Intern Zone
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/CommunityComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              Community
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/EventsComingSoon" className="connection-link" onClick={() => setShowNetwork(false)}>
              Events
            </Link>
          </div>
        </div>
      )}
      {showUploadSection && (
        <div className="upload-overlay" onClick={handleCloseUpload}>
          <div
            className="upload-container"
            onClick={(e) => e.stopPropagation()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {mediaList.length === 0 && (
              <div className="upload-first-div">
                <p className="upload-text">Drag & Drop your media here</p>
                <button
                  className="upload-button"
                  onClick={() => inputRef.current.click()}
                >
                  Upload
                </button>
              </div>
            )}
            {mediaList.length !== 0 && showAddMore && (
              <div className="after-upload">
                <div className="navbar">
                  <span
                    className="back-button"
                    onClick={handleCloseUpload}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCloseUpload();
                      }
                    }}
                  >
                    {/* Back */}
                  </span>
                  <h6
                    onClick={() => {
                      setShowPostDetails(true);
                      setShowAddMore(false);
                    }}
                    style={{
                      marginRight: "50px",
                      cursor: "pointer",
                      fontSize: "22px",
                    }}
                  >
                    Continue
                  </h6>
                </div>
                <div className="preview-container">
                  {mediaList.map((media, index) => (
                    <div key={index} className="media-item">
                      {media.mediaType === "image" ? (
                        <img
                          className="imageAndVideo"
                          src={media.previewURL}
                          alt="Uploaded media"
                        />
                      ) : (
                        <video
                          className="imageAndVideo"
                          src={media.previewURL}
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="add-more-btn"
                  onClick={() => inputRef.current.click()}
                >
                  Add More
                </button>
              </div>
            )}
            {showPostDetails && (
              <div className="create-post-main-container">
                <div className="create-post-after-upload">
                  <div className="create-post-navbar">
                    <div className="image-and-name">
                      <img
                        src={userProfileImage || "/profile-image.png"}
                        alt="Profile"
                      />
                      <h3>{username || "User"}</h3>
                    </div>
                    <h6
                      onClick={handlePostSubmit}
                      className={isLoading ? "disabled" : ""}
                    >
                      {isLoading ? "Posting..." : "Create Post"}
                    </h6>
                  </div>
                  <div className="post-content-container">
                    <div className="image-and-caption">
                      {mediaList.map((media, index) => (
                        <div key={index} className="post-media-container">
                          {media.mediaType === "image" ? (
                            <img
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              alt="Uploaded media"
                            />
                          ) : (
                            <video
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              controls
                            />
                          )}
                        </div>
                      ))}
                      <div className="form-group">
                        <label className="input-label">Caption</label>
                        <textarea
                          className="caption-input"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Write a caption..."
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Location</label>
                        <input
                          type="text"
                          className="location-input"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Enter location (e.g., Dehradun)"
                        />
                      </div>
                    </div>
                    <div className="mention-form-group">
                      <label className="input-label">Add Mentions</label>
                      <div
                        className="mention-button"
                        role="button"
                        tabIndex={0}
                        onClick={handleAddMention}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleAddMention();
                          }
                        }}
                      >
                        +
                      </div>
                    </div>
                    <div className="privacy-settings">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Hide Likes</h4>
                          <p className="setting-description">
                            No one will be able to see the number of likes on
                            your post, except you
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={hideLikes}
                            onChange={(e) => setHideLikes(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Turn Off Comments</h4>
                          <p className="setting-description">
                            No one will be able to comment on this post
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={disableComments}
                            onChange={(e) =>
                              setDisableComments(e.target.checked)
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="submit-section">
                      {error && <p className="error-message">{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileInput}
              accept="image/*,video/*"
              multiple
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFooter;