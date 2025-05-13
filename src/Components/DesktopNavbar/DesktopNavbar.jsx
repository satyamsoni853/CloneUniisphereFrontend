import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./DesktopNavbar.css";

// Icons
import { FiSearch } from "react-icons/fi";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import AddBlack from "./AddBlackIcon.svg";
import AddWhite from "./AddWhiteIcon.svg";
import BackIcon from "./BackIcon.svg";
import NetworkBlack from "./NetworkBlackIcon.svg";
import NetworkWhite from "./NetworkWhiteIcon.svg";
import UnisphereLogoIcon from "./UnisphereLogoIcon.svg";
import UserIcon from "./UserIcon.svg";
import ClenderBlack from "./ClenderBlackIcon.svg";
import ClenderWhite from "./ClenderWhiteIcon.svg";
import Background from "../Background/Background";

function DesktopNavbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [showAddMore, setShowAddMore] = useState(true);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [posts, setPosts] = useState(0);
  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [allUsersResponse, setAllUsersResponse] = useState(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Notification state
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState("Today");
  const [notifications, setNotifications] = useState([
    {
      time: "2 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "notification-border-blue-400",
    },
    {
      time: "3 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "notification-border-yellow-400",
    },
    {
      time: "6 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "notification-border-red-400",
    },
  ]);
  const buttonscolor = ["#DB3E3933", "#DDC058", "#A17A97"];

  // Search-related state
  const [activeTab, setActiveTab] = useState("Trend");
  const [suggestedUsers] = useState([
    {
      id: 7,
      name: "Rahul",
      university: "UPES",
      profilePictureUrl: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Satyam",
      university: "IITM",
      profilePictureUrl: "https://via.placeholder.com/40",
    },
    {
      id: 9,
      name: "Jack",
      university: "Delhi University",
      profilePictureUrl: "https://via.placeholder.com/40",
    },
  ]);
  const [trends] = useState([
    {
      id: 1,
      title: "New Youth, New Power",
      description:
        "eufblueeblejdfrbr, irwe. hpleufblueeblejdfrbr ygbh hbd yfgqieufbluejd. L",
      image: "https://via.placeholder.com/60x40",
      category: "E-Books",
    },
  ]);
  const [events] = useState([]);
  const [news] = useState([]);

  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
      if (
        !event.target.closest(".connections-card") &&
        !event.target.closest(".desktop-icon")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keydown events (e.g., Esc to close)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowResults(false);
        setShowDropdown(false);
        setShowNotificationDropdown(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fetch connections from the API
  useEffect(() => {
    const fetchConnections = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Please log in to continue");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/connections",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log("Connections API Response:", response.data);
      } catch (err) {
        console.error(
          "Error fetching connections:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch connections");
      }
    };
    fetchConnections();
  }, [navigate, setError]);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Please log in to continue");
        navigate("/login");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/users/getAll",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const users = Array.isArray(response.data) ? response.data : [];
        setAllUsersResponse(users);
        console.log(
          "All User IDs:",
          users.map((user) => user.id)
        );
      } catch (err) {
        console.error("Error fetching all users:", err);
        setError(err.response?.data?.message || "Failed to fetch users");
        setAllUsersResponse([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [navigate, setError]);

  // Time filters for notifications
  const timeFilters = {
    Today: (time) => time.includes("hrs"),
    "Last Week": (time) => time.includes("days") && parseInt(time) <= 7,
    "Last Month": (time) =>
      time.includes("days") && parseInt(time) > 7 && parseInt(time) <= 30,
    "Last Year": (time) => time.includes("days") && parseInt(time) > 30,
  };

  const filteredNotifications = notifications.filter((notif) =>
    timeFilters[activeNotificationTab](notif.time)
  );

  // Fetch profiles by username
  const fetchProfiles = useCallback(async (username = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://uniisphere-backend-latest.onrender.com/api/users/profile/?search=${encodeURIComponent(username)}`
      );
      console.log("Search API Response:", response.data);
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Failed to fetch profiles");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch stats from /posts
  const fetchStats = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (!authToken || !userId) {
      setError("Please log in to continue");
      navigate("/login");
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
      console.log("Profile Stats response:", response.data);
      if (response.data.totalPosts && Array.isArray(response.data.totalPosts)) {
        const userPosts = response.data.totalPosts.filter(
          (post) => post.user.id === userId
        );
        if (userPosts.length > 0) {
          console.log(
            "Setting userProfileImage:",
            userPosts[0].user.profilePictureUrl
          );
          setUsername(userPosts[0].user.username || "");
          setUserProfileImage(userPosts[0].user.profilePictureUrl || "");
        }
        const totalLikesCount = userPosts.reduce(
          (sum, post) => sum + (post._count?.Likes || 0),
          0
        );
        const totalCommentsCount = userPosts.reduce(
          (sum, post) => sum + (post._count?.Comments || 0),
          0
        );
        setTotalLikes(totalLikesCount);
        setTotalComments(totalCommentsCount);
        setPosts(userPosts.length);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setError("Failed to load stats");
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch stats");
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((username) => fetchProfiles(username), 500),
    [fetchProfiles]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const username = e.target.value;
    setSearchQuery(username);
    if (/^[a-z0-9_]*$/i.test(username)) {
      debouncedSearch(username);
    } else {
      setError("Only letters, numbers, and underscores allowed");
    }
  };

  // Handle profile click
  const handleProfileClick = (userId) => {
    localStorage.setItem("SearchUserId", userId);
    if (allUsersResponse && Array.isArray(allUsersResponse)) {
      const idExists = allUsersResponse.some((user) => user.id === userId);
      console.log(`Checking if User ID ${userId} exists: ${idExists}`);
      navigate(
        idExists
          ? `/AfterConnecting/${userId}`
          : "/DesFollowerMiddleSectionPrivacy"
      );
    } else {
      console.error("User data not loaded:", allUsersResponse);
      navigate("/DesFollowerMiddleSectionPrivacy");
    }
    setShowResults(false);
    setSearchQuery("");
  };

  // Initial load
  useEffect(() => {
    fetchProfiles();
    fetchStats();
  }, [fetchProfiles]);
  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search results if clicking outside search container
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }

      // Close network dropdown if clicking outside connections card or network icon
      if (
        !event.target.closest(".connections-card") &&
        !event.target.closest(".desktop-icon.network-icon")
      ) {
        setShowDropdown(false);
      }

      // Close notification dropdown if clicking outside notification dropdown or notification icon
      if (
        !event.target.closest(".notification-dropdown") &&
        !event.target.closest(".notification-icon-container")
      ) {
        setShowNotificationDropdown(false);
        setActiveIcon((prev) => (prev === "notifications" ? null : prev));
      }

      // Close user dropdown if clicking outside user dropdown or user icon
      if (
        !event.target.closest(".self-profile-card") &&
        !event.target.closest(".user-icon-container")
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // User dropdown handlers
  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setShowNotificationDropdown(false);
    setShowDropdown(false);
  };

  const handleSignOut = () => {
    setIsUserDropdownOpen(false);
    console.log("User signed out");
    // Add sign-out logic here
  };

  const handleEditProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/ProfileEditSection/${userId}`);
    } else {
      console.error("User ID not found");
    }
  };

  // Handle notification icon click
  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setIsUserDropdownOpen(false);
    setShowDropdown(false);
    setActiveIcon((prev) =>
      prev === "notifications" ? null : "notifications"
    );
  };

  // Handle calendar icon click
  const handleClenderClick = () => {
    setIsUserDropdownOpen(false);
    setShowDropdown(false);
    setShowNotificationDropdown(false);
    setActiveIcon((prev) => (prev === "clender" ? null : "clender"));
    // Add calendar functionality here, e.g., navigate("/calendar") or open a calendar modal
  };

  // Navigation icon handlers
  const handleIconClick = (iconName) => {
    console.log(`Icon clicked: ${iconName}, showDropdown: ${showDropdown}`); // Debug log
    setActiveIcon(activeIcon === iconName ? null : iconName);
    setShowNotificationDropdown(false);
    switch (iconName) {
      case "home":
        navigate("/view");
        break;
      case "network":
        setShowDropdown((prev) => !prev);
        break;
      case "add":
        setShowUploadSection(true);
        break;
      case "notifications":
        handleNotificationClick();
        break;
      default:
        break;
    }
  };

  // Upload section handlers
  const handleFileChange = (e) => {
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
            comment: "",
          },
        ]);
      }
    });
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
            comment: "",
          },
        ]);
      }
    });
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!authToken || !userId) {
        throw new Error("Please log in to continue");
      }
      const formData = new FormData();
      mediaList.forEach((media) => formData.append("media", media.file));
      formData.append("content", caption);
      formData.append("userId", userId);
      formData.append("visibility", hideLikes ? "private" : "public");
      formData.append("location", location || "");
      formData.append("tags", "");
      const postResponse = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/posts",
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Post created:", postResponse.data);
      setMediaList([]);
      setCaption("");
      setLocation("");
      setHideLikes(false);
      setDisableComments(false);
      setShowPostDetails(false);
      setShowAddMore(true);
      setShowUploadSection(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseUpload = () => {
    setShowUploadSection(false);
    setShowPostDetails(false);
    setShowAddMore(true);
    setMediaList([]);
    setCaption("");
    setLocation("");
    setHideLikes(false);
    setDisableComments(false);
    setError(null);
  };

  useEffect(() => {
    return () => {
      mediaList.forEach((media) => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

  return (
    <div className="desktop-navbar-1">
      {/* Navigation Icons */}
      <div className="icon-wrapper">
        {activeIcon === "home" ? (
          <IoHomeOutline
            className="desktop-icon"
            size={24}
            onClick={() => handleIconClick("home")}
            title="Home"
          />
        ) : (
          <IoHome
            className="desktop-icon"
            size={24}
            onClick={() => handleIconClick("home")}
            title="Home"
          />
        )}
      </div>
      <div className="icon-wrapper">
        <img
          src={activeIcon === "network" ? NetworkBlack : NetworkWhite}
          alt="Explore"
          className="desktop-icon"
          onClick={() => handleIconClick("network")}
        />
      </div>
      <div className="icon-wrapper">
        <img
          src={activeIcon === "add" ? AddBlack : AddWhite}
          alt="Add"
          className="desktop-icon"
          onClick={() => handleIconClick("add")}
        />
      </div>
      <div className="notification-icon-container icon-wrapper">
        {activeIcon === "notifications" ? (
          <IoNotifications
            className="desktop-icon"
            size={24}
            onClick={handleNotificationClick}
            title="Notifications"
          />
        ) : (
          <IoMdNotificationsOutline
            className="desktop-icon"
            size={24}
            onClick={handleNotificationClick}
            title="Notifications"
          />
        )}
        {showNotificationDropdown && (
          <div className="notification-dropdown">
            <div className="notification-tabs">
              {Object.keys(timeFilters).map((tab) => (
                <button
                  key={tab}
                  className={`notification-tab-button ${activeNotificationTab === tab ? "active" : ""
                    }`}
                  onClick={() => setActiveNotificationTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="notification-list">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`notification-item ${notif.color}`}
                  >
                    <img
                      src={
                        notif.profilePictureUrl ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Profile"
                      className="notification-profile-pic"
                      onError={(e) => (e.target.src = UserIcon)}
                    />
                    <div className="notification-content">
                      <p className="notification-sender">Vijay Prasad</p>
                      <p className="notification-message">{notif.message}</p>
                    </div>
                    <span className="notification-time">{notif.time}</span>
                    {notif.alert && (
                      <span className="notification-alert">🔔</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="notification-empty">
                  No notifications in this time range.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="icon-wrapper">
        <Link to="/coming-soon" className="connection-link">
          <img
            src={activeIcon === "clender" ? ClenderBlack : ClenderWhite}
            alt="Calendar"
            className="desktop-icon"
            title="Calendar"
          />
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="user-icon-container">
        <img
          src={localStorage.getItem("profilePicture")}
          alt="User"
          className="desktop-user-icon"
          onClick={handleUserIconClick}
          onError={(e) => (e.target.src = UserIcon)}
        />
        {isUserDropdownOpen && (
          <div className="self-profile-card">
            <div className="self-profile-header">
              <img
                src={
                  localStorage.getItem("profilePicture") ||
                  "https://via.placeholder.com/50"
                }
                alt="Profile"
                className="self-profile-pic"
                onError={(e) => (e.target.src = UserIcon)}
              />
              <div className="self-profile-info">
                <h2 className="self-profile-name">
                  {localStorage.getItem("username") || "User Name"}
                </h2>
                <p className="self-profile-label">Position</p>
              </div>
            </div>
            <button
              className="self-profile-edit-button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <div className="self-profile-stats">
              <div className="self-profile-stat">
                <span>Posts</span>
                <span className="self-profile-stat-value">{posts}</span>
              </div>
              <div className="self-profile-stat">
                <span>Likes</span>
                <span className="self-profile-stat-value">{totalLikes}</span>
              </div>
              <div className="self-profile-stat">
                <span>Comments</span>
                <span className="self-profile-stat-value">{totalComments}</span>
              </div>
            </div>
            <div className="self-profile-menu">
              <div
                className="self-profile-menu-item"
                onClick={() => navigate("/SelfSetting")}
              >
                Settings
              </div>
              <div className="self-profile-menu-item">
                <Link to="/helpform">Help</Link>
              </div>
              <div
                className="self-profile-menu-item self-profile-sign-out"
                onClick={handleSignOut}
              >
                <Link to="/">Sign Out</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Network Dropdown */}
      {showDropdown && (
        <div className="connections-card">
          <div className="connections-item connections-card-1">
            <Link to="/NetworkPage" className="connection-link">
              Connection
            </Link>
          </div>

          <div className="connections-item">
            <Link to="/Books" className="connection-link">
              Eduvault
            </Link>
          </div>

          <div className="connections-item">
            <Link to="/HumanLibGuidelines" className="connection-link">
              Human Library
            </Link>
          </div>

          <div className="connections-item">
            <Link to="/libblog" className="connection-link">
              Blogs
            </Link>
          </div>

          <div className="connections-item">

            <Link to="/MentorshipComingSoon" className="connection-link">

              MentorShip
            </Link>
          </div>

          <div className="connections-item">
 
            <Link to="/SkillupComingSoon" className="connection-link">
 
              Skillup
            </Link>
          </div>

          <div className="connections-item">
 
            <Link to="/FreelancingComingSoon" className="connection-link">
 
              Freelancing
            </Link>
          </div>

          <div className="connections-item">
 
            <Link to="/InternzoneComingSoon" className="connection-link">
  
              Intern Zone
            </Link>
          </div>

          <div className="connections-item">
            <Link to="/CommunityComingSoon" className="connection-link">
              Community
            </Link>
          </div>

          <div className="connections-item">
            <Link to="/EventsComingSoon" className="connection-link">
              Events
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar with Updated Interface */}
      <div className="desktop-search-container" ref={searchContainerRef}>
        <div className="desktop-search-input-wrapper">
          <input
            type="text"
            placeholder="Search for users, trends, events, news..."
            className="desktop-search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
          />
          <FiSearch className="desktop-search-icon" />
        </div>
        {showResults && (
          <div className="desktop-search-results">
            <Background />
            {/* Search Results Section */}
            <div className="search-section">
              <h4 className="search-section-title">Users</h4>
              <div className="recent-search-list">
                {isLoading ? (
                  <div className="desktop-search-loading">Searching...</div>
                ) : error ? (
                  <div className="desktop-search-error">{error}</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="recent-search-item"
                      onClick={() => handleProfileClick(item.id)}
                    >
                      <img
                        src={localStorage.getItem("profilePicture")}
                        alt={item.name || item.username}
                        className="recent-search-avatar"
                        loading="lazy"
                        onError={(e) => (e.target.src = UserIcon)}
                      />
                      <span className="recent-search-name">
                        {item.name || item.username}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="desktop-search-no-results">
                    No users found
                  </div>
                )}
              </div>
            </div>

            {/* Suggested Users Section */}
            <div className="search-section">
              <h4 className="search-section-title">Suggested</h4>
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="suggested-user-item"
                  onClick={() => handleProfileClick(user.id)}
                >
                  <img
                    src={user.profilePictureUrl || UserIcon}
                    alt={user.name}
                    className="suggested-user-avatar"
                    loading="lazy"
                    onError={(e) => (e.target.src = UserIcon)}
                  />
                  <div className="suggested-user-info">
                    <span className="suggested-user-name">{user.name}</span>
                    <p className="suggested-user-university">
                      {user.university}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs for Trend/Event/News */}
            <div className="search-section">
              <h4 className="search-section-title search-section-title2">
                What you should put your eyes & thoughts on
              </h4>
              <div className="search-tabs">
                {["Trend", "Event", "News"].map((tab, index) => (
                  <button
                    style={{
                      backgroundColor:
                        buttonscolor[index % buttonscolor.length],
                    }}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`search-tab-button ${activeTab === tab ? "active" : ""
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Trend" ? (
                <div className="trend-results">
                  {trends.map((trend) => (
                    <div key={trend.id} className="trend-item">
                      <img
                        src={trend.image}
                        alt={trend.title}
                        className="trend-image"
                        onError={(e) => (e.target.src = UserIcon)}
                      />
                      <div className="trend-info">
                        <p className="trend-title">{trend.title}</p>
                        <p className="trend-description">{trend.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === "Event" ? (
                <div className="event-results">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <div key={event.id} className="event-item">
                        <img
                          src={
                            event.image || "https://via.placeholder.com/60x40"
                          }
                          alt={event.title}
                          className="event-image"
                          onError={(e) => (e.target.src = UserIcon)}
                        />
                        <div className="event-info">
                          <p className="event-title">{event.title}</p>
                          <p className="event-description">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No events found</p>
                  )}
                </div>
              ) : (
                <div className="news-results">
                  {news.length > 0 ? (
                    news.map((item) => (
                      <div key={item.id} className="news-item">
                        <img
                          src={
                            item.image || "https://via.placeholder.com/60x40"
                          }
                          alt={item.title}
                          className="news-image"
                          onError={(e) => (e.target.src = UserIcon)}
                        />
                        <div className="news-info">
                          <p className="news-title">{item.title}</p>
                          <p className="news-description">{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No news found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logo */}
      <img
        src={UnisphereLogoIcon}
        alt="Unisphere Logo"
        className="desktop-logo-icon"
      />

      {/* Upload Section Overlay */}
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
                  Upload from computer
                </button>
              </div>
            )}
            {mediaList.length !== 0 && showAddMore && (
              <div className="after-upload">
                <div className="navbar">
                  <img src={BackIcon} alt="Back" onClick={handleCloseUpload} />
                  <h6
                    onClick={() => {
                      setShowPostDetails(true);
                      setShowAddMore(false);
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
                        src={userProfileImage || UserIcon}
                        alt="Profile"
                        onError={(e) => (e.target.src = UserIcon)}
                      />
                      <h3>{username || "Himanshu Choudary"}</h3>
                    </div>
                    <h6 onClick={handlePostSubmit} disabled={isLoading}>
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
                    </div>
                    <div className="privacy-settings">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Hide Likes</h4>
                          <p className="setting-description">
                            Only you can see the number of likes on your post.
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
                            No one will be able to comment on this post.
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
              accept="image/*,video/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopNavbar;
