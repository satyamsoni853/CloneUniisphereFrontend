import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MobileFooter.css"; // Import CSS for styling

import AddIcon from "./Addicon.png";
import CalendarIcon from "./Calendaricon.png";
import HomeIcon from "./Homeicon.png";
import NetworkIcon from "./Networkicon.png";
import NotificationIcon from "./Notificationicon.png";

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

  // Fetch user profile data (username and profile image)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!authToken || !userId) {
        setError("Authentication required");
        return;
      }
      try {
        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/posts",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        // Defensive check for response data
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
  }, []);

  // Clean up media URLs on component unmount or mediaList change
  useEffect(() => {
    return () => {
      mediaList.forEach((media) => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

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

  // Optional: Basic mentions handler (expand as needed)
  const handleAddMention = () => {
    // Placeholder for mentions functionality
    console.log("Add mention clicked");
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!authToken || !userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      const formData = new FormData();
      mediaList.forEach((media) => {
        formData.append("media", media.file);
      });

      formData.append("content", caption);
      formData.append("userId", userId);
      formData.append("visibility", hideLikes ? "private" : "public");
      formData.append("location", location || "");
      formData.append("tags", mentions.join(","));

      const postResponse = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Post created:", postResponse.data);

      // Reset form state
      handleCloseUpload();
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-footer">
      <div className="mobile-footer-container">
        <Link to="/View">
          <img src={HomeIcon} alt="Home" className="mobile-footer-icon" />
        </Link>
        <img
          src={NotificationIcon}
          alt="Notification"
          className="mobile-footer-icon"
          aria-disabled="true"
        />
        <img
          src={AddIcon}
          alt="Add"
          className="mobile-footer-add-icon"
          onClick={() => setShowUploadSection(true)}
        />
       
<Link to="/coming-soon">
  <img
    src={CalendarIcon}
    alt="Calendar"
    className="mobile-footer-icon"
    aria-disabled="true"
  />
</Link>
        <img
          src={NetworkIcon}
          onClick={() => setShowNetwork(!showNetwork)}
          alt="Network"
          className="mobile-footer-icon"
        />
      </div>
      {showNetwork && (
        <div className="mobile-connections-card">
          <div className="mobile-connections-item mobile-connection-connection  ">
            <Link to="/NetworkPage" className="connection-link  ">
              Connection
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/Books" className="connection-link">
              Eduvault
            </Link>
          </div>
          <div className="mobile-connections-item active">
            <Link to="/HumanLib" className="connection-link">
              Human Library
            </Link>
          </div>

          <div className="mobile-connections-item">
            <Link to="/coming-soon" className="connection-link">
              Freelancing
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/coming-soon" className="connection-link">
              Skillup
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/coming-soon" className="connection-link">
              Freelancing
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/coming-soon" className="connection-link">
              Intern Zone
            </Link>
          </div>
          <div className="mobile-connections-item">
            <Link to="/libblog" className="connection-link">
              Blog
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
                      marginRight: "50px", // uniform margin on all sides
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
