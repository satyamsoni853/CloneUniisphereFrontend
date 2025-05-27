import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../Background/Background.jsx";
import "./AfterOtpSection1.css";
import Unispherelogo from "./Unispherelogo.png";

function AfterOtpSection1() {
  const location = useLocation();
  const navigate = useNavigate();

  const { username: passedUsername, token: passedToken } = location.state || {};

  useEffect(() => {
    console.log("location.state:", location.state);
    if (!passedToken) {
      console.warn("Warning: No token received from previous page");
    } else {
      console.log("Token received successfully:", passedToken);
    }
    console.log("passedUsername:", passedUsername);
  }, [passedToken, passedUsername]);

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(passedToken || "");
  const [userId, setUserId] = useState(null);

  // State for Step 1
  const [username, setUsername] = useState(passedUsername ?? "");
  const [Gender, setGender] = useState("");
  const [userLocation, setUserLocation] = useState("");

  // State for Step 2
  const [college, setCollege] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");

  // State for Step 3 (Interests & Skills)
  const [interestQuery, setInterestQuery] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isInterestDropdownOpen, setIsInterestDropdownOpen] = useState(false);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);

  // State for Step 4 (Profile Photo)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  // Refs for click-outside detection
  const interestRef = useRef(null);
  const skillRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("username state:", username);
  }, [username]);

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  // Clean up preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (profilePhotoPreview) {
        URL.revokeObjectURL(profilePhotoPreview);
      }
    };
  }, [profilePhotoPreview]);

  // Click-outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (interestRef.current && !interestRef.current.contains(event.target)) {
        setIsInterestDropdownOpen(false);
      }
      if (skillRef.current && !skillRef.current.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Step Handlers
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!username || !Gender || !userLocation) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }
    setError("");
    setStep(2);
    setIsSubmitting(false);
  };

  const handleSecondStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!college || !semester || !course) {
      setError("All required fields must be filled");
      setIsSubmitting(false);
      return;
    }
    setError("");
    setStep(3);
    setIsSubmitting(false);
  };

  const handleThirdStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (selectedInterests.length < 2 || selectedSkills.length < 2) {
      setError("Please select at least 2 interests and 2 skills");
      setIsSubmitting(false);
      return;
    }
    setError("");
    setStep(4);
    setIsSubmitting(false);
  };

  const handleFinalStepSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!token) {
      setError("Authentication token is missing. Please go back to the login page and try again.");
      setIsSubmitting(false);
      return;
    }
    if (!username || !Gender || !userLocation || !college || !semester || !course || !profilePhoto) {
      setError("All required fields must be filled, including profile photo");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("Gender", Gender);
      formData.append("location", userLocation);
      formData.append("Skills", JSON.stringify(selectedSkills));
      formData.append("Interests", JSON.stringify(selectedInterests));
      formData.append("college", college);
      formData.append("degree", course);
      formData.append("semester", semester);
      formData.append("profilePhoto", profilePhoto);

      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/completeProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.trim()}`,
          },
          timeout: 30000,
        }
      );
      setUserId(response.data.userId || response.data.id || username);
      alert("Profile completed successfully!");
      navigate("/view", {
        state: {
          userToken: response.data.token,
          userId: response.data.user.id,
        },
      });
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.error || err.message || "Profile completion failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Profile Photo Handler
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePhotoPreview(previewUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Interest and Skill Handlers
  const handleInterestSelect = (value) => {
    if (selectedInterests.length >= 5) return;
    if (selectedInterests.includes(value)) return;
    setSelectedInterests([...selectedInterests, value]);
    setInterestQuery("");
    setIsInterestDropdownOpen(false);
  };

  const handleSkillSelect = (value) => {
    if (selectedSkills.length >= 5) return;
    if (selectedSkills.includes(value)) return;
    setSelectedSkills([...selectedSkills, value]);
    setSkillQuery("");
    setIsSkillDropdownOpen(false);
  };

  const handleInterestRemove = (value) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== value));
  };

  const handleSkillRemove = (value) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== value));
  };

  const getFilteredInterests = () => {
    const query = interestQuery.toLowerCase();
    if (!query) return interestSuggestions;
    return interestSuggestions.filter((interest) => interest.toLowerCase().includes(query));
  };

  const getFilteredSkills = () => {
    const query = skillQuery.toLowerCase();
    if (!query) return skillSuggestions;
    return skillSuggestions.filter((skill) => skill.toLowerCase().includes(query));
  };

  const interestSuggestions = [
    "Acting", "Activism", "Advertising", "Aerospace", "Agriculture", "AI", "Algebra", "Algorithms",
    "Anatomy", "Animation", "Anthropology", "App-Development", "Archaeology", "Architecture", "Art",
    "Artificial-Intelligence", "Astronomy", "Athletics", "Audio-Engineering", "Automation", "Aviation",
    "Baking", "Banking", "Basketball", "Bioengineering", "Bioinformatics", "Biology", "Biomechanics",
    "Biophysics", "Blogging", "Blockchain", "Board-Games", "Book-Club", "Botany", "Boxing", "Branding",
    "Broadcasting", "Business", "Calligraphy", "Camping", "Career-Development", "Carpentry", "Chemistry",
    "Chess", "Choir", "Cinematography", "Civil-Engineering", "Classical-Music", "Climate-Change", "Coding",
    "Comedy", "Communication", "Community-Service", "Computer-Graphics", "Computer-Science", "Construction",
    "Content-Creation", "Cooking", "Copywriting", "Counseling", "Creative-Writing", "Cricket", "Culinary-Arts",
    "Cultural-Studies", "Cycling", "Dance", "Data-Analytics", "Data-Science", "Debate", "Design", "Digital-Art",
    "Digital-Marketing", "Digital-Painting", "Diplomacy", "DIY", "Drama", "Drawing", "E-commerce", "Economics",
    "Education", "Electrical-Engineering", "Electronics", "Embroidery", "Emergency-Medicine", "Engineering",
    "English-Literature", "Entrepreneurship", "Environmentalism", "Esports", "Event-Planning", "Fashion",
    "Fencing", "Film", "Finance", "Fine-Arts", "Fitness", "Flute", "Folk-Music", "Football", "Foreign-Languages",
    "Forensics", "Forestry", "Gardening", "Gaming", "Genetics", "Geology", "Geography", "Graphic-Design",
    "Gymnastics", "Handball", "Health", "Hiking", "History", "Hockey", "Home-Decor", "Hospitality", "Human-Rights",
    "Illustration", "Improv", "Industrial-Design", "Information-Technology", "Innovation", "Instrumental-Music",
    "Interior-Design", "International-Relations", "Investing", "Journalism", "Judo", "Karate", "Kickboxing",
    "Knitting", "Law", "Leadership", "Literature", "Logistics", "Machine-Learning", "Magic", "Management",
    "Manufacturing", "Marketing", "Martial-Arts", "Mathematics", "Mechanical-Engineering", "Media-Studies",
    "Medicine", "Meditation", "Mentorship", "Metallurgy", "Meteorology", "Microbiology", "Military-Science",
    "Mobile-App-Development", "Modeling", "Modern-Art", "Molecular-Biology", "Motorsport", "Mountaineering",
    "Movie-Critique", "Multimedia", "Music", "Mythology", "Nanotechnology", "Networking", "Neuroscience",
    "Nutrition", "Opera", "Painting", "Paleontology", "Paragliding", "Parkour", "Performing-Arts",
    "Personal-Finance", "Personal-Training", "Philosophy", "Photography", "Physics", "Pilates", "Podcasting",
    "Poetry", "Political-Science", "Pottery", "Programming", "Project-Management", "Psychology", "Public-Health",
    "Public-Relations", "Public-Speaking", "Quantum-Computing", "Quantum-Physics", "Radio-Hosting", "Reading",
    "Real-Estate", "Recycling", "Renewable-Energy", "Research", "Robotics", "Rocketry", "Rowing", "Rugby",
    "Running", "Salsa", "Sculpture", "Self-Defense", "Sewing", "Singing", "Skateboarding", "Skating",
    "Social-Media", "Social-Work", "Sociology", "Software-Development", "Sound-Engineering", "Space-Exploration",
    "Spanish", "Speechwriting", "Spirituality", "Sports", "Stand-Up-Comedy", "Startups", "Stock-Trading",
    "Storytelling", "Strategy-Games", "Street-Art", "Student-Government", "Sustainability", "Swimming",
    "Table-Tennis", "Taekwondo", "Taxation", "Teaching", "Technical-Writing", "Technology", "Tennis", "Theater",
    "Theology", "Tourism", "Trading", "Traditional-Dance", "Travel", "Urban-Planning", "UX-Design", "VFX",
    "Video-Editing", "Videography", "Violin", "Virtual-Reality", "Volleyball", "Volunteering", "Web-Development",
    "Weightlifting", "Wildlife-Conservation", "Windsurfing", "Woodworking", "Wrestling", "Writing", "Yoga",
    "Zoology", "3D-Modeling", "3D-Printing", "Acoustic-Guitar", "Acting-Coaching", "Anime", "Aquaponics",
    "Archery", "Astronomy-Photography", "Auto-Racing", "Ballet", "Barista-Skills", "Bartending", "Beer-Brewing",
    "Birdwatching", "Blacksmithing", "Bodybuilding", "Bouldering", "Candle-Making", "Car-Restoration",
    "Chess-Strategy"
  ];

  const skillSuggestions = [
    "HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Bootstrap", "Tailwind CSS", "TypeScript",
    "UI/UX", "Graphic Design", "Logo Design", "Typography", "Infographics", "Digital Illustration",
    "Resume Designing", "Node.js", "Express.js", "Java", "Spring Boot", "Python", "Django", "Flask", "PHP",
    "Laravel", "C#", ".NET", "C++", "API Development", "REST APIs", "GraphQL", "Web Scraping", "SQL",
    "MySQL", "PostgreSQL", "MongoDB", "Oracle", "Data Visualization", "Git", "GitHub", "Docker", "Jenkins",
    "CI/CD", "AWS", "Azure", "Firebase", "Cloud Computing", "Linux", "VS Code", "Agile/Scrum",
    "Data Structures & Algorithms", "Smart Home Setup", "Jest", "Mocha", "Cypress", "Selenium", "JUnit",
    "Software Testing", "Web Development", "WordPress", "App Development", "Game Development",
    "Chatbot Development", "AR/VR", "IoT", "Automation", "Blockchain", "AI/ML", "Cybersecurity",
    "Ethical Hacking", "Cloud Security", "App Monetization", "Animation", "Video Editing", "3D Modeling",
    "NFT Art", "Interior Design", "Photography", "Stock Photography", "Virtual Reality Content",
    "3D Printing", "Handmade Crafts", "DIY Home Decor", "Content Writing", "Copywriting", "Technical Writing",
    "Ghostwriting", "Resume Writing", "Scriptwriting", "Blogging", "Research Writing", "Translation",
    "Transcription", "Speech Writing", "Freelance Writing", "Copyediting", "Proofreading",
    "Email Copywriting", "Public Relations Writing", "Social Media", "SEO", "Email Marketing",
    "Ads Management", "Affiliate Marketing", "Influencer Marketing", "PR", "Market Research",
    "Lead Generation", "Growth Hacking", "Sales Funnels", "Video Marketing", "Social Media Ads",
    "Google Analytics", "Digital Fundraising", "Accounting", "Financial Analysis", "Stock Trading",
    "Cryptocurrency", "Tax Filing", "Budgeting", "Crowdfunding", "Business Valuation", "Investment Analysis",
    "Risk Management", "Business Consulting", "HR Management", "Business Proposal", "E-commerce",
    "Dropshipping", "Product Listing", "Print-on-Demand", "B2B Sales", "Customer Retention",
    "Online Courses", "Subscription Business", "Retail Management", "Public Speaking", "Negotiation",
    "Conflict Resolution", "Time Management", "Leadership", "Networking", "Emotional Intelligence",
    "Personal Branding", "Interviewing", "Problem-Solving", "Personal Development", "Stress Management",
    "Meditation", "Relationship Building", "Workplace Communication", "Professional Dressing", "Job Search",
    "Legal Knowledge", "Debt Management", "Resume Optimization", "Personal Finance", "Online Tutoring",
    "Language Teaching", "Music Lessons", "Fitness Training", "Life Coaching", "Career Counseling",
    "Exam Coaching", "Yoga", "Skill Training", "Dance Choreography", "Virtual Assistance", "Data Entry",
    "Email Management", "Customer Support", "Travel Planning", "Project Management", "Event Planning",
    "Document Formatting", "CRM Management", "Customer Retention", "Podcasting", "Podcast Editing",
    "Voiceover", "Voice Modulation", "Mobile Repair", "Car Maintenance", "Home Repair", "Cooking",
    "Nutrition", "First Aid", "Emergency Preparedness", "Gardening", "Public Transport Navigation",
    "Apartment Hunting"
  ];

  // Render Steps
  const renderFirstStep = () => (
    <Form onSubmit={handleFirstStepSubmit}>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Username*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={!!passedUsername}
        />
      </Form.Group>
      <Form.Group controlId="Gender" className="mb-3">
        <Form.Label>Gender*</Form.Label>
        <Form.Select
          value={Gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="location" className="mb-3">
        <Form.Label>Location*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your location (e.g., New York, NY)"
          value={userLocation}
          onChange={(e) => setUserLocation(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p className="error-text">{error}</p>}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>
    </Form>
  );

  const renderSecondStep = () => (
    <Form onSubmit={handleSecondStepSubmit}>
      <Form.Group controlId="college" className="mb-3">
        <Form.Label>College*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your college name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="semester" className="mb-3">
        <Form.Label>Semester*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your current semester (e.g., 3rd)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="course" className="mb-3">
        <Form.Label>Course*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your course (e.g., B.Tech in Computer Science)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p className="error-text">{error}</p>}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
    </Form>
  );

  const renderThirdStep = () => {
    const filteredInterests = getFilteredInterests();
    const filteredSkills = getFilteredSkills();

    return (
      <Form onSubmit={handleThirdStepSubmit}>
        <Form.Group controlId="interests" className="mb-3">
          <Form.Label>Interests (Select up to 5)*</Form.Label>
          <div className="interest-search relative" ref={interestRef}>
            <Form.Control
              type="text"
              placeholder="Search interests"
              value={interestQuery}
              onChange={(e) => {
                setInterestQuery(e.target.value);
                setIsInterestDropdownOpen(true);
              }}
              onFocus={() => setIsInterestDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsInterestDropdownOpen(false);
              }}
              className="w-full"
            />
            <span className="search-icon">🔍</span>
            {isInterestDropdownOpen && filteredInterests.length > 0 && (
              <div className="dropdown-list">
                {filteredInterests.map((interest, index) => (
                  <div
                    key={`interest-${interest}-${index}`}
                    className="dropdown-item"
                    onClick={() => handleInterestSelect(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-items">
            {selectedInterests.map((interest, index) => (
              <span key={`selected-interest-${interest}-${index}`} className="selected-interest">
                {interest}
                <span onClick={() => handleInterestRemove(interest)}>×</span>
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="skills" className="mb-3">
          <Form.Label>Skills (Select up to 5)*</Form.Label>
          <div className="skill-search relative" ref={skillRef}>
            <Form.Control
              type="text"
              placeholder="Search skills"
              value={skillQuery}
              onChange={(e) => {
                setSkillQuery(e.target.value);
                setIsSkillDropdownOpen(true);
              }}
              onFocus={() => setIsSkillDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsSkillDropdownOpen(false);
              }}
              className="w-full"
            />
            <span className="search-icon">🔍</span>
            {isSkillDropdownOpen && filteredSkills.length > 0 && (
              <div className="dropdown-list">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={`skill-${skill}-${index}`}
                    className="dropdown-item"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-items">
            {selectedSkills.map((skill, index) => (
              <span key={`selected-skill-${skill}-${index}`} className="selected-skill">
                {skill}
                <span onClick={() => handleSkillRemove(skill)}>×</span>
              </span>
            ))}
          </div>
        </Form.Group>

        <p className="text-sm text-gray-600 mt-2">Select at least 2 interests and 2 skills, up to 5 each.</p>
        {error && <p className="error-text">{error}</p>}
        <Button
          variant="primary"
          type="submit"
          className="otp-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Next"}
        </Button>
      </Form>
    );
  };

  const renderFourthStep = () => (
    <Form onSubmit={handleFinalStepSubmit}>
      <Form.Group controlId="profilePhoto" className=" Profile-phot-main-conmmtainer mb-3">
        <Form.Label  className="Profile-photo-heading" >Profile Photo*</Form.Label>
        <div className="profile-photo-container" onClick={handleImageClick}>
          {profilePhotoPreview ? (
            <img
              src={profilePhotoPreview}
              alt="Profile Preview"
              className="profile-photo-preview"
            />
          ) : (
            <div className="profile-photo-placeholder">
              Click to upload a photo
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfilePhotoChange}
          style={{ display: "none" }}
          required
        />
      </Form.Group>
      <p className="Profileimage-desc">Please upload a profile picture to make your connections faster and easier.</p>
      {error && <p className="error-text">{error}</p>}
      <Button
        variant="primary"
        type="submit"
        className="finish-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Finish"}
      </Button>
    </Form>
  );

  return (
    <div>
      <div className="title-section-signup">
        <img src={Unispherelogo} alt="Unisphere Logo" className="top-left-logo" />
        <h1 className="unisphere-title-signup">
          <span className="u">U</span>
          <span className="n">N</span>
          <span className="i">I</span>
          <span className="i">I</span>
          <span className="s">S</span>
          <span className="p">P</span>
          <span className="h">H</span>
          <span className="e">E</span>
          <span className="r">R</span>
          <span className="e">E</span>
        </h1>
        <h3>
          <span>"Connect" </span>
          <span>"Collaborate" </span>
          <span>"Succeed"</span>
        </h3>
      </div>
      <div className="signup-Page-1">
        <Background />
        <div className="otp-box">
          <div className="progress-indicator">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`step ${step >= s ? "completed" : ""}`}
                aria-label={`Step ${s} ${step >= s ? "completed" : "not completed"}`}
              ></div>
            ))}
          </div>
          {step === 1
            ? renderFirstStep()
            : step === 2
            ? renderSecondStep()
            : step === 3
            ? renderThirdStep()
            : renderFourthStep()}
          <p className="privacy-text">
            Your Privacy is Important <br />
            We may send you member uploads, recruiter messages, job suggestions,
            invitations, reminders, and promotional messages from us and our
            parents. You can change your preference anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AfterOtpSection1;