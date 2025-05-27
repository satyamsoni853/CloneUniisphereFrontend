import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../Background/Background";
import "./MobileNavbar.css";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import SendMsg from './send.svg';
import Vector from './vector.svg';
import UserIcon from "./Usericon.png";
import axios from "axios";
import debounce from "lodash/debounce";

// Memoize to prevent unnecessary re-renders
const MobileNavbar = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Trend");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "your-user-id-here";
  const token = localStorage.getItem("authToken");
  const searchContainerRef = useRef(null);

  // Static data (can be fetched from API in a real app)
  const buttonscolor = ["#DB3E3933", "#DDC058", "#A17A97"];
  const [recentSearches] = useState([]);
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

  // Combined search results
  const filteredRecentSearches = recentSearches.filter((search) =>
    search.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const combinedRecentResults = searchQuery
    ? [
        ...filteredRecentSearches,
        ...searchResults.filter(
          (result) =>
            !filteredRecentSearches.some((search) => search.id === result.id)
        ),
      ]
    : recentSearches;

  // Handle clicks outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key to close search results
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowResults(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch profiles by username
  const fetchProfiles = useCallback(async (username = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://uniisphere-backend-latest.onrender.com/api/users/profile/?search=${encodeURIComponent(
          username
        )}`
      );
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Failed to fetch profiles");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch unread messages count
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch(
          `https://uniisphere-backend-latest.onrender.com/api/messages/conversations?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        const unread = data.filter((msg) => msg.status === "unread" || !msg.read);
        setUnreadCount(unread.length);
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };
    if (token) fetchUnreadMessages();
  }, [userId, token]);

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
  const handleProfileClick = useCallback((userId) => {
    localStorage.setItem("SearchUserId", userId);
    navigate(`/AfterConnecting/${userId}`);
    setShowResults(false);
    setSearchQuery("");
  }, [navigate]);

  // Handle key press for accessibility
  const handleKeyDown = useCallback((e, userId) => {
    if (e.key === "Enter" || e.key === " ") handleProfileClick(userId);
  }, [handleProfileClick]);

  // Handle logo click
  const handleLogoClick = () => {
    if (!userId || userId === "your-user-id-here") {
      setError("Please log in to access your profile");
      return;
    }
    navigate(`/ProfileEditSection/${userId}`);
  };

  // Initial fetch
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div className="mobile-navbar-container">
      <Background />
      <div className="mobile-navbar">
        {/* Logo */}
        <img
          src={Vector}
          alt="Logo"
          className="mobile-navbar-logo"
          // onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
          loading="lazy"
        />

        {/* Search Bar */}
        <div className="mobile-navbar-search-container" ref={searchContainerRef}>
          <div className="mobile-navbar-search">
            <FiSearch className="mobile-navbar-search-icon" />
            <input
              type="text"
              placeholder="Search username"
              className="mobile-navbar-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              aria-label="Search for users"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="mobile-search-results">
              {/* Recent Searches */}
              <div className="mobile-search-section">
                <h4 className="mobile-search-section-title">Recent</h4>
                <div className="mobile-recent-search-list">
                  {isLoading ? (
                    <div className="mobile-search-loading">Searching...</div>
                  ) : error ? (
                    <div className="mobile-search-error">{error}</div>
                  ) : combinedRecentResults.length > 0 ? (
                    <div className="mobile-search-recents-list">
                      {combinedRecentResults.map((item) => (
                        <div
                          key={item.id}
                          className="mobile-recent-search-item"
                          onClick={() => handleProfileClick(item.id)}
                          onKeyDown={(e) => handleKeyDown(e, item.id)}
                          tabIndex={0}
                          role="button"
                          aria-label={`View profile of ${item.name || item.username}`}
                        >
                          <img
                            src={item.profilePictureUrl || UserIcon}
                            alt={item.name || item.username}
                            className="mobile-recent-search-avatar"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <span className="mobile-recent-search-name">
                            {item.name || item.username}
                          </span>
                          <IoIosArrowForward className="mobile-recent-search-arrow" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mobile-search-no-results">
                      No recent searches
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Users */}
              <div className="mobile-search-section">
                <h4 className="mobile-search-section-title">Suggested</h4>
                {suggestedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="mobile-suggested-user-item"
                    onClick={() => handleProfileClick(user.id)}
                    onKeyDown={(e) => handleKeyDown(e, user.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View profile of ${user.name}`}
                  >
                    <img
                      src={user.profilePictureUrl || UserIcon}
                      alt={user.name}
                      className="mobile-suggested-user-avatar"
                      loading="lazy"
                      onError={(e) => (e.target.src = UserIcon)}
                    />
                    <div className="mobile-suggested-user-info">
                      <span className="mobile-suggested-user-name">{user.name}</span>
                      <p className="mobile-suggested-user-university">
                        {user.university}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs for Trend/Event/News */}
              <div className="mobile-search-section">
                <div className="mobile-search-title-wrapper">
                  <h4 className="mobile-search-section-title2">
                    What you should put your eyes & thoughts on
                  </h4>
                </div>
                <div className="mobile-search-tabs">
                  {["Trend", "Event", "News"].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`mobile-search-tab-button ${activeTab === tab ? "active" : ""}`}
                      style={{ backgroundColor: buttonscolor[index % buttonscolor.length] }}
                      aria-pressed={activeTab === tab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === "Trend" ? (
                  <div className="mobile-trend-results">
                    {trends.map((trend) => (
                      <div key={trend.id} className="mobile-trend-item">
                        <img
                          src={trend.image}
                          alt={trend.title}
                          className="mobile-trend-image"
                          loading="lazy"
                          onError={(e) => (e.target.src = UserIcon)}
                        />
                        <div className="mobile-trend-info">
                          <p className="mobile-trend-title">{trend.title}</p>
                          <p className="mobile-trend-description">{trend.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activeTab === "Event" ? (
                  <div className="mobile-event-results">
                    {events.length > 0 ? (
                      events.map((event) => (
                        <div key={event.id} className="mobile-event-item">
                          <img
                            src={event.image || "https://via.placeholder.com/60x40"}
                            alt={event.title}
                            className="mobile-event-image"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <div className="mobile-event-info">
                            <p className="mobile-event-title">{event.title}</p>
                            <p className="mobile-event-description">{event.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mobile-no-results">No events found</p>
                    )}
                  </div>
                ) : (
                  <div className="mobile-news-results">
                    {news.length > 0 ? (
                      news.map((item) => (
                        <div key={item.id} className="mobile-news-item">
                          <img
                            src={item.image || "https://via.placeholder.com/60x40"}
                            alt={item.title}
                            className="mobile-news-image"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <div className="mobile-news-info">
                            <p className="mobile-news-title">{item.title}</p>
                            <p className="mobile-news-description">{item.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mobile-no-results">No news found</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message Icon */}
        <Link to="/MessageMobileInbox" aria-label="Messages">
          <div className="mobile-navbarr-icon-wrapper">
            <img
              src={SendMsg}
              alt="Message"
              className="mobile-navbarr-icon"
              loading="lazy"
            />
            {unreadCount > 0 && (
              <span className="mobile-unread-badge">{unreadCount}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
});

export default MobileNavbar;