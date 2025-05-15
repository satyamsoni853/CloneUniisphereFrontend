import axios from "axios";
import React, { useEffect, useState } from "react";
import ConnectAndCollaborate from "./connectAndCollaborate.png";
import ConnectImage from "./connectImage.png";
import "./DesktopRight.css";
import ProfileImage from "./profileImage.jpeg";
import ConnectAndCollaborateSvg from "./connectAndCollaborate.svg";
import BottomMessagesWidget from "../BottomMessagesWidget/BottomMessagesWidget";

function DesktopRightSection() {
  const [connect, setConnect] = useState(0);
  const [collaborate, setCollaborate] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [suggestionsError, setSuggestionsError] = useState(null);

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const authData = getAuthData();
      if (!authData) {
        setError("Authentication data not found");
        setLoading(false);
        return;
      }
      
      setUserId(authData.userId);

      try {
        const profileResponse = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/users/profile`,
          {
            params: {
              userId: authData.userId
            },
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );

        if (profileResponse.data && profileResponse.data.length > 0) {
          const userData = profileResponse.data[0];
          setProfileData(userData);

          // Store user data in localStorage
          localStorage.setItem("profilePicture", userData.profilePictureUrl || "");
          localStorage.setItem("username", userData.username || "");

          // Set connection counts
          const connectCount = userData._count?.connections1 || 0;
          const collaborateCount = userData._count?.connections2 || 0;
          setConnect(connectCount);
          setCollaborate(collaborateCount);
        }

        // Fetch suggestions
        const suggestionsResponse = await axios({
          method: "get",
          url: `https://uniisphere-backend-latest.onrender.com/api/suggestions`,
          params: {
            limit: 5 // Limit to 5 suggestions for the sidebar
          },
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });

        if (suggestionsResponse.data.success) {
          const fetchedSuggestions = suggestionsResponse.data.data.map((user) => ({
            id: user.id,
            img: user.profilePictureUrl || ProfileImage,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User",
            username: user.username,
            headline: user.headline || "No headline available",
            matchScore: user.matchScore,
            mutualConnections: user.matchScore.mutualConnections
          }));

          setSuggestions(fetchedSuggestions);
        } else {
          setSuggestionsError("Failed to load suggestions");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFullName = () => {
    if (!profileData) return "Loading...";
    return `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim();
  };

  const getProfilePictureUrl = () => {
    if (!profileData) return ProfileImage;
    return profileData.profilePictureUrl || ProfileImage;
  };

  const getHeadline = () => {
    if (!profileData) return "";
    return profileData.headline || profileData.college || "No headline available";
  };

  return (
    <div className="right-section-container">
      <div className="rightsection">
        {loading && <div className="loading">Loading profile data...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-card">
          <img
            src={getProfilePictureUrl()}
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.src = ProfileImage;
            }}
          />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connect}</span>
              <span>{collaborate}</span>
            </div>
            <img src={ConnectAndCollaborateSvg} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        <div className="profile-details">
          <h3 className="profile-name">{getFullName()}</h3>
          <p className="profile-company">{profileData?.username || "Uniisphere"}</p>
          <p className="profile-location">{profileData?.location || "Location not specified"}</p>
          <p className="profile-headline">{getHeadline()}</p>
          <p className="profile-bio">
            {profileData?.About || "Bio not available"}
            <span className="see-more"> .....see more</span>
          </p>
        </div>

        <div className="suggested-cards">
          <h4 className="suggested-title">Suggestions</h4>
          {suggestionsError && <div className="error-message">{suggestionsError}</div>}
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="suggestion-card">
              <img src={suggestion.img} alt={suggestion.name} className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">{suggestion.name}</p>
                <p className="suggestion-username">@{suggestion.username}</p>
                <p className="suggestion-headline">{suggestion.headline}</p>
                {suggestion.mutualConnections > 0 && (
                  <p className="mutual-connections">
                    {suggestion.mutualConnections} mutual connection{suggestion.mutualConnections !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button className="connect-button">
                <img className="Desktop-connect-btn" src={ConnectImage} alt="Connect" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomMessagesWidget />
    </div>
  );
}

export default DesktopRightSection;
