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

  // Extract email, password, username, and token from location.state
  const {
    email,
    password,
    username: passedUsername,
    token: passedToken,
  } = location.state || {};

  useEffect(() => {
    // Log all relevant data
    console.log("location.state:", location.state);
    console.log("email:", email);
    console.log("password:", password);
    console.log("passedUsername:", passedUsername);
    if (!passedToken) {
      console.warn("Warning: No token received from previous page");
    } else {
      console.log("Token received successfully:", passedToken);
    }
  }, [email, password, passedUsername, passedToken]);

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
  const [courseQuery, setCourseQuery] = useState("");
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for Step 3 (Interests & Skills)
  const [interestQuery, setInterestQuery] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [interestSuggestionsFiltered, setInterestSuggestionsFiltered] =
    useState([]);
  const [skillSuggestionsFiltered, setSkillSuggestionsFiltered] = useState([]);
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
  const courseRef = useRef(null);
  const fileInputRef = useRef(null);

  // Predefined list of 50 courses
  const courseOptions = [
    "B.E. (Bachelor of Engineering)",
    "B.Tech in Computer Science and Engineering",
    "B.Tech in Information Technology",
    "B.Tech in Electronics and Communication Engineering",
    "B.Tech in Mechanical Engineering",
    "B.Tech in Civil Engineering",
    "B.Tech in Electrical Engineering",
    "B.Tech in Aerospace Engineering",
    "B.Tech in Chemical Engineering",
    "B.Tech in Biotechnology",
    "B.Tech in Artificial Intelligence and Machine Learning",
    "B.Tech in Cybersecurity",
    "B.Tech in Internet of Things (IoT)",
    "B.Tech in Data Science",
    "B.Tech in Robotics and Automation",
    "B.Tech in Automobile Engineering",
    "B.Tech in Environmental Engineering",
    "B.Tech in Biomedical Engineering",
    "B.Tech in Avionics",
    "B.Tech in Agricultural Engineering",
    "B.Tech in Marine Engineering",
    "B.Tech in Petroleum Engineering",
    "B.Tech in Textile Engineering",
    "B.Tech in Food Technology",
    "B.Tech in Metallurgical Engineering",
    "BBA in Finance",
    "BBA in Marketing",
    "BBA in Human Resource Management",
    "BBA in International Business",
    "BBA in Entrepreneurship",
    "BBA in Digital Marketing",
    "BBA in Aviation Management",
    "BBA in Logistics and Supply Chain Management",
    "BBA in Retail Management",
    "BBA in Event Management",
    "B.Com (Bachelor of Commerce)",
    "B.Com (Hons) in Accounting and Finance",
    "B.Com in Banking and Insurance",
    "B.Com in Taxation",
    "B.Sc in Computer Science",
    "B.Sc in Information Technology",
    "BCA (Bachelor of Computer Applications)",
    "B.Sc in Data Science",
    "B.Sc in Artificial Intelligence",
    "B.Des (Bachelor of Design)",
    "BBA LLB (Integrated Law and Business Administration)",
    "B.Tech + MBA (Integrated)",
    "B.Sc in Economics",
    "BBA in Business Analytics",
    "B.Sc in Animation and Multimedia",
  ];

  // Interest and Skill Suggestions
  const interestSuggestions = [
    "Acting",
    "Activism",
    "Advertising",
    "Aerospace",
    "Agriculture",
    "AI",
    "Algebra",
    "Algorithms",
    "Anatomy",
    "Animation",
    "Anthropology",
    "App-Development",
    "Archaeology",
    "Architecture",
    "Art",
    "Artificial Intelligence",
    "Astronomy",
    "Athletics",
    "Audio-Engineering",
    "Automation",
    "Aviation",
    "Baking",
    "Banking",
    "Basketball",
    "Bioengineering",
    "Bioinformatics",
    "Biology",
    "Biomechanics",
    "Biophysics",
    "Blogging",
    "Blockchain",
    "Board-Games",
    "Book-Club",
    "Botany",
    "Boxing",
    "Branding",
    "Broadcasting",
    "Business",
    "Calligraphy",
    "Camping",
    "Career-Development",
    "Carpentry",
    "Chemistry",
    "Chess",
    "Choir",
    "Cinematography",
    "Civil-Engineering",
    "Classical-Music",
    "Climate-Change",
    "Coding",
    "Comedy",
    "Communication",
    "Community-Service",
    "Computer-Graphics",
    "Computer-Science",
    "Construction",
    "Content-Creation",
    "Cooking",
    "Copywriting",
    "Counseling",
    "Creative-Writing",
    "Cricket",
    "Culinary-Arts",
    "Cultural-Studies",
    "Cycling",
    "Dance",
    "Data-Analytics",
    "Data-Science",
    "Debate",
    "Design",
    "Digital-Art",
    "Digital-Marketing",
    "Digital-Painting",
    "Diplomacy",
    "DIY",
    "Drama",
    "Drawing",
    "E-commerce",
    "Economics",
    "Education",
    "Electrical-Engineering",
    "Electronics",
    "Embroidery",
    "Emergency-Medicine",
    "Engineering",
    "English-Literature",
    "Entrepreneurship",
    "Environmentalism",
    "Esports",
    "Event-Planning",
    "Fashion",
    "Fencing",
    "Film",
    "Finance",
    "Fine-Arts",
    "Fitness",
    "Flute",
    "Folk-Music",
    "Football",
    "Foreign-Languages",
    "Forensics",
    "Forestry",
    "Gardening",
    "Gaming",
    "Genetics",
    "Geology",
    "Geography",
    "Graphic-Design",
    "Gymnastics",
    "Handball",
    "Health",
    "Hiking",
    "History",
    "Hockey",
    "Home-Decor",
    "Hospitality",
    "Human-Rights",
    "Illustration",
    "Improv",
    "Industrial-Design",
    "Information-Technology",
    "Innovation",
    "Instrumental-Music",
    "Interior-Design",
    "International-Relations",
    "Investing",
    "Journalism",
    "Judo",
    "Karate",
    "Kickboxing",
    "Knitting",
    "Law",
    "Leadership",
    "Literature",
    "Logistics",
    "Machine-Learning",
    "Magic",
    "Management",
    "Manufacturing",
    "Marketing",
    "Martial-Arts",
    "Mathematics",
    "Mechanical-Engineering",
    "Media-Studies",
    "Medicine",
    "Meditation",
    "Mentorship",
    "Metallurgy",
    "Meteorology",
    "Microbiology",
    "Military-Science",
    "Mobile-App-Development",
    "Modeling",
    "Modern-Art",
    "Molecular-Biology",
    "Motorsport",
    "Mountaineering",
    "Movie-Critique",
    "Multimedia",
    "Music",
    "Mythology",
    "Nanotechnology",
    "Networking",
    "Neuroscience",
    "Nutrition",
    "Opera",
    "Painting",
    "Paleontology",
    "Paragliding",
    "Parkour",
    "Performing-Arts",
    "Personal-Finance",
    "Personal-Training",
    "Philosophy",
    "Photography",
    "Physics",
    "Pilates",
    "Podcasting",
    "Poetry",
    "Political-Science",
    "Pottery",
    "Programming",
    "Project-Management",
    "Psychology",
    "Public-Health",
    "Public-Relations",
    "Public-Speaking",
    "Quantum-Computing",
    "Quantum-Physics",
    "Radio-Hosting",
    "Reading",
    "Real-Estate",
    "Recycling",
    "Renewable-Energy",
    "Research",
    "Robotics",
    "Rocketry",
    "Rowing",
    "Rugby",
    "Running",
    "Salsa",
    "Sculpture",
    "Self-Defense",
    "Sewing",
    "Singing",
    "Skateboarding",
    "Skating",
    "Social-Media",
    "Social-Work",
    "Sociology",
    "Software-Development",
    "Sound-Engineering",
    "Space-Exploration",
    "Spanish",
    "Speechwriting",
    "Spirituality",
    "Sports",
    "Stand-Up-Comedy",
    "Startups",
    "Stock-Trading",
    "Storytelling",
    "Strategy-Games",
    "Street-Art",
    "Student-Government",
    "Sustainability",
    "Swimming",
    "Table-Tennis",
    "Taekwondo",
    "Taxation",
    "Teaching",
    "Technical-Writing",
    "Technology",
    "Tennis",
    "Theater",
    "Theology",
    "Tourism",
    "Trading",
    "Traditional-Dance",
    "Travel",
    "Urban-Planning",
    "UX-Design",
    "VFX",
    "Video-Editing",
    "Videography",
    "Violin",
    "Virtual-Reality",
    "Volleyball",
    "Volunteering",
    "Web-Development",
    "Weightlifting",
    "Wildlife-Conservation",
    "Windsurfing",
    "Woodworking",
    "Wrestling",
    "Writing",
    "Yoga",
    "Zoology",
    "3D-Modeling",
    "3D-Printing",
    "Acoustic-Guitar",
    "Acting-Coaching",
    "Anime",
    "Aquaponics",
    "Archery",
    "Astronomy-Photography",
    "Auto-Racing",
    "Ballet",
    "Barista-Skills",
    "Bartending",
    "Beer-Brewing",
    "Birdwatching",
    "Blacksmithing",
    "Bodybuilding",
    "Bouldering",
    "Candle-Making",
    "Car-Restoration",
    "Chess-Strategy",
  ];

  const skillSuggestions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Vue.js",
    "Angular",
    "Bootstrap",
    "Tailwind CSS",
    "TypeScript",
    "UI/UX",
    "Graphic Design",
    "Logo Design",
    "Typography",
    "Infographics",
    "Digital Illustration",
    "Resume Designing",
    "Node.js",
    "Express.js",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "Flask",
    "PHP",
    "Laravel",
    "C#",
    ".NET",
    "C++",
    "API Development",
    "REST APIs",
    "GraphQL",
    "Web Scraping",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "Data Visualization",
    "Git",
    "GitHub",
    "Docker",
    "Jenkins",
    "CI/CD",
    "AWS",
    "Azure",
    "Firebase",
    "Cloud Computing",
    "Linux",
    "VS Code",
    "Agile/Scrum",
    "Data Structures & Algorithms",
    "Smart Home Setup",
    "Jest",
    "Mocha",
    "Cypress",
    "Selenium",
    "JUnit",
    "Software Testing",
    "Web Development",
    "WordPress",
    "App Development",
    "Game Development",
    "Chatbot Development",
    "AR/VR",
    "IoT",
    "Automation",
    "Blockchain",
    "AI/ML",
    "Cybersecurity",
    "Ethical Hacking",
    "Cloud Security",
    "App Monetization",
    "Animation",
    "Video Editing",
    "3D Modeling",
    "NFT Art",
    "Interior Design",
    "Photography",
    "Stock Photography",
    "Virtual Reality Content",
    "3D Printing",
    "Handmade Crafts",
    "DIY Home Decor",
    "Content Writing",
    "Copywriting",
    "Technical Writing",
    "Ghostwriting",
    "Resume Writing",
    "Scriptwriting",
    "Blogging",
    "Research Writing",
    "Translation",
    "Transcription",
    "Speech Writing",
    "Freelance Writing",
    "Copyediting",
    "Proofreading",
    "Email Copywriting",
    "Public Relations Writing",
    "Social Media",
    "SEO",
    "Email Marketing",
    "Ads Management",
    "Affiliate Marketing",
    "Influencer Marketing",
    "PR",
    "Market Research",
    "Lead Generation",
    "Growth Hacking",
    "Sales Funnels",
    "Video Marketing",
    "Social Media Ads",
    "Google Analytics",
    "Digital Fundraising",
    "Accounting",
    "Financial Analysis",
    "Stock Trading",
    "Cryptocurrency",
    "Tax Filing",
    "Budgeting",
    "Crowdfunding",
    "Business Valuation",
    "Investment Analysis",
    "Risk Management",
    "Business Consulting",
    "HR Management",
    "Business Proposal",
    "E-commerce",
    "Dropshipping",
    "Product Listing",
    "Print-on-Demand",
    "B2B Sales",
    "Customer Retention",
    "Online Courses",
    "Subscription Business",
    "Retail Management",
    "Public Speaking",
    "Negotiation",
    "Conflict Resolution",
    "Time Management",
    "Leadership",
    "Networking",
    "Emotional Intelligence",
    "Personal Branding",
    "Interviewing",
    "Problem-Solving",
    "Personal Development",
    "Stress Management",
    "Meditation",
    "Relationship Building",
    "Workplace Communication",
    "Professional Dressing",
    "Job Search",
    "Legal Knowledge",
    "Debt Management",
    "Resume Optimization",
    "Personal Finance",
    "Online Tutoring",
    "Language Teaching",
    "Music Lessons",
    "Fitness Training",
    "Life Coaching",
    "Career Counseling",
    "Exam Coaching",
    "Yoga",
    "Skill Training",
    "Dance Choreography",
    "Virtual Assistance",
    "Data Entry",
    "Email Management",
    "Customer Support",
    "Travel Planning",
    "Project Management",
    "Event Planning",
    "Document Formatting",
    "CRM Management",
    "Customer Retention",
    "Podcasting",
    "Podcast Editing",
    "Voiceover",
    "Voice Modulation",
    "Mobile Repair",
    "Car Maintenance",
    "Home Repair",
    "Cooking",
    "Nutrition",
    "First Aid",
    "Emergency Preparedness",
    "Gardening",
    "Public Transport Navigation",
    "Apartment Hunting",
  ];

  // Mapping of courses to relevant interests and skills
  const courseInterestsSkillsMap = {
    "B.Tech in Computer Science and Engineering": {
      interests: [
        "Coding",
        "Artificial Intelligence",
        "Data Science",
        "Algorithms",
        "Computer Science",
        "Software Development",
        "Web Development",
        "App Development",
      ],
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Data Structures & Algorithms",
        "Git",
        "Web Development",
        "API Development",
      ],
    },
    "B.Tech in Information Technology": {
      interests: [
        "Information Technology",
        "Networking",
        "Cloud Computing",
        "Cybersecurity",
        "Web Development",
      ],
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "AWS",
        "Azure",
        "Web Development",
        "Network Security",
      ],
    },
    "BBA in Marketing": {
      interests: [
        "Marketing",
        "Branding",
        "Advertising",
        "Digital Marketing",
        "Social Media",
      ],
      skills: [
        "SEO",
        "Social Media",
        "Email Marketing",
        "Market Research",
        "Ads Management",
        "Google Analytics",
      ],
    },
    "BBA in Finance": {
      interests: [
        "Finance",
        "Investing",
        "Personal Finance",
        "Stock Trading",
        "Economics",
      ],
      skills: [
        "Financial Analysis",
        "Accounting",
        "Stock Trading",
        "Budgeting",
        "Investment Analysis",
      ],
    },
    "B.Com (Bachelor of Commerce)": {
      interests: ["Accounting", "Finance", "Business", "Economics", "Taxation"],
      skills: [
        "Accounting",
        "Tax Filing",
        "Financial Analysis",
        "Business Consulting",
      ],
    },
    "B.Sc in Animation and Multimedia": {
      interests: [
        "Animation",
        "Digital Art",
        "Graphic Design",
        "Multimedia",
        "VFX",
      ],
      skills: [
        "Graphic Design",
        "Animation",
        "Video Editing",
        "3D Modeling",
        "Digital Illustration",
      ],
    },
    "B.Des (Bachelor of Design)": {
      interests: [
        "Design",
        "Graphic Design",
        "Interior Design",
        "Fashion",
        "UX Design",
      ],
      skills: [
        "UI/UX",
        "Graphic Design",
        "Typography",
        "Interior Design",
        "Digital Illustration",
      ],
    },
    default: {
      interests: interestSuggestions,
      skills: skillSuggestions,
    },
  };

  // Get filtered course suggestions based on input
  const getCourseSuggestions = () => {
    const query = courseQuery.toLowerCase();
    if (!query) return courseOptions.slice(0, 5); // Show top 5 courses when query is empty
    return courseOptions
      .filter((option) => option.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Get filtered interest suggestions based on input
  const getInterestSuggestions = () => {
    const query = interestQuery.toLowerCase();
    const courseInterests =
      courseInterestsSkillsMap[course]?.interests ||
      courseInterestsSkillsMap.default.interests;
    if (!query) return courseInterests.slice(0, 5); // Show top 5 interests when query is empty
    return courseInterests
      .filter((interest) => interest.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Get filtered skill suggestions based on input
  const getSkillSuggestions = () => {
    const query = skillQuery.toLowerCase();
    const courseSkills =
      courseInterestsSkillsMap[course]?.skills ||
      courseInterestsSkillsMap.default.skills;
    if (!query) return courseSkills.slice(0, 5); // Show top 5 skills when query is empty
    return courseSkills
      .filter((skill) => skill.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Update suggestions when query changes
  useEffect(() => {
    setInterestSuggestionsFiltered(getInterestSuggestions());
  }, [interestQuery, course]);

  useEffect(() => {
    setSkillSuggestionsFiltered(getSkillSuggestions());
  }, [skillQuery, course]);

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
      if (courseRef.current && !courseRef.current.contains(event.target)) {
        setIsCourseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redirect if critical fields are missing
  useEffect(() => {
    if (!email || !passedToken) {
      setError("Missing required data. Please complete the signup process.");
      navigate("/");
    }
  }, [email, passedToken, navigate]);

  // Handle geolocation
  const handleTrackLocation = () => {
    if (navigator.geolocation) {
      setIsSubmitting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Use a reverse geocoding API (e.g., OpenStreetMap Nominatim)
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const { address } = response.data;
            const locationString = `${
              address.city || address.town || address.village || ""
            }, ${address.country || ""}`;
            setUserLocation(locationString);
            setError("");
          } catch (err) {
            console.error("Geolocation error:", err);
            setError("Failed to fetch location. Please enter manually.");
          } finally {
            setIsSubmitting(false);
          }
        },
        (err) => {
          console.error("Geolocation permission denied:", err);
          setError("Location access denied. Please enter manually.");
          setIsSubmitting(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

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
    if (!college || !semester || !course || !phoneNumber) {
      setError("All required fields must be filled");
      setIsSubmitting(false);
      return;
    }
    // Basic phone number validation
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
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

  const resizeAndCompressImage = (file) => {
    return new Promise((resolve, reject) => {
      const maxWidth = 500;
      const maxHeight = 500;
      const quality = 0.7;
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(resizedBase64);
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFinalStepSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validate required fields
    if (!token) {
      setError(
        "Authentication token is missing. Please go back to the login page and try again."
      );
      setIsSubmitting(false);
      return;
    }
    if (
      !email ||
      !password ||
      !username ||
      !Gender ||
      !userLocation ||
      !college ||
      !semester ||
      !course ||
      !phoneNumber ||
      selectedInterests.length < 2 ||
      selectedSkills.length < 2
    ) {
      setError(
        "All required fields must be filled, including at least 2 interests and 2 skills"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      let profilePictureBase64 = "";
      if (profilePhoto) {
        profilePictureBase64 = await resizeAndCompressImage(profilePhoto);
        console.log("Profile picture compressed and resized successfully");
      }

      const userData = {
        email,
        password,
        username,
        firstName: username, // Default to username as fallback
        lastName: "", // Empty as not collected
        PhoneNumber: phoneNumber, // Use phone number directly
        Gender,
        Skills: selectedSkills,
        Interests: selectedInterests,
        headline: [""], // Changed to array to match Prisma schema
        location: userLocation,
        About: "", // Empty as not collected
        college,
        degree: course,
        workorProject: semester, // Map semester to workorProject
        startYear: null,
        endYear: null,
        profilePictureBase64,
      };

      // Log userData (equivalent to formData) with date/time
      console.group(
        `UserData Submission - ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`
      );
      console.log("email:", userData.email);
      console.log("password:", "********"); // Masked for security
      console.log("username:", userData.username);
      console.log("Gender:", userData.Gender);
      console.log("PhoneNumber:", userData.PhoneNumber);
      console.log("location:", userData.location);
      console.log("college:", userData.college);
      console.log("semester:", userData.workorProject);
      console.log("degree:", userData.degree);
      console.log("Skills:", JSON.stringify(userData.Skills));
      console.log("Interests:", JSON.stringify(userData.Interests));
      console.log(
        "profilePhoto:",
        profilePictureBase64
          ? profilePictureBase64.substring(0, 50) + "..."
          : "No file selected"
      );
      console.groupEnd();

      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/completeProfile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      // Log API response with date/time
      console.group(
        `API Response - ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`
      );
      console.log("Response Data:", response.data);
      console.log("Status Code:", response.status);
      console.groupEnd();

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
      // Log API error response with date/time
      console.group(
        `API Error - ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`
      );
      console.log("Error Message:", err.message);
      console.log("Response Data:", err.response?.data || "No response data");
      console.log("Status Code:", err.response?.status || "N/A");
      console.groupEnd();
      setError(
        err.response?.data?.error || err.message || "Profile completion failed"
      );
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

  // Course Selection Handler
  const handleCourseSelect = (value) => {
    setCourse(value);
    setCourseQuery(value);
    setIsCourseDropdownOpen(false);
    setSelectedInterests([]);
    setSelectedSkills([]);
  };

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
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Form.Control
            type="text"
            placeholder="Enter your location (e.g., New York, NY)"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <Button
            variant="outline-primary"
            onClick={handleTrackLocation}
            disabled={isSubmitting}
            style={{ whiteSpace: "nowrap" }}
          >
            {isSubmitting ? "Tracking..." : "Track Location"}
          </Button>
        </div>
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
        <div style={{ position: "relative" }} ref={courseRef}>
          <Form.Control
            type="text"
            placeholder="Search courses"
            value={courseQuery}
            onChange={(e) => {
              setCourseQuery(e.target.value);
              setIsCourseDropdownOpen(true);
              if (!e.target.value) setCourse("");
            }}
            onFocus={() => setIsCourseDropdownOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsCourseDropdownOpen(false);
              if (e.key === "Enter" && getCourseSuggestions().length > 0) {
                e.preventDefault();
                handleCourseSelect(getCourseSuggestions()[0]);
              }
            }}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
            required
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: "#6c757d",
            }}
          >
            🔍
          </span>
          {isCourseDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                maxHeight: "80px",
                overflowY: "auto",
                zIndex: 1000,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {getCourseSuggestions().map((option, index) => (
                <div
                  key={`course-${index}`}
                  onClick={() => handleCourseSelect(option)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor:
                      course === option ? "#e9ecef" : "transparent",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      course === option ? "#e9ecef" : "transparent")
                  }
                >
                  {option}
                </div>
              ))}
              {getCourseSuggestions().length === 0 && (
                <div
                  style={{
                    padding: "8px 12px",
                    color: "#6c757d",
                  }}
                >
                  No matching courses
                </div>
              )}
            </div>
          )}
        </div>
      </Form.Group>
      <Form.Group controlId="phoneNumber" className="mb-3">
        <Form.Label>Phone Number*</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          required
        />
      </Form.Group>
      {error && <p className="error-text">{error}</p>}
      <Button type="submit" className="otp-btn" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
    </Form>
  );

  const renderThirdStep = () => {
    return (
      <Form onSubmit={handleThirdStepSubmit}>
        <Form.Group controlId="interests" className="mb-3">
          <Form.Label>Interests (Select up to 5)*</Form.Label>
          <div
            style={{
              position: "relative",
              marginBottom: "10px",
            }}
            ref={interestRef}
          >
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
                if (
                  e.key === "Enter" &&
                  interestSuggestionsFiltered.length > 0
                ) {
                  e.preventDefault();
                  handleInterestSelect(interestSuggestionsFiltered[0]);
                }
              }}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
              }}
            >
              🔍
            </span>
            {isInterestDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  maxHeight: "120px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 20,
                  scrollbarWidth: "thin",
                  scrollbarColor: "#888 #f1f1f1",
                }}
              >
                {interestSuggestionsFiltered.map((interest, index) => (
                  <div
                    key={`interest-${index}`}
                    onClick={() => handleInterestSelect(interest)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom:
                        index < interestSuggestionsFiltered.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {interest}
                  </div>
                ))}
                {interestSuggestionsFiltered.length === 0 && (
                  <div
                    style={{
                      padding: "10px",
                      color: "#666",
                    }}
                  >
                    No matching interests
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            {selectedInterests.map((interest, index) => (
              <span
                key={`selected-interest-${interest}-${index}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background:
                    "linear-gradient(180deg, rgba(68, 169, 177, 0.06) 0%, rgba(51, 255, 0, 0.06) 88.19%)",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  color: "#333",
                }}
              >
                {interest}
                <span
                  onClick={() => handleInterestRemove(interest)}
                  style={{
                    color: "red",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="skills" className="mb-3">
          <Form.Label>Skills (Select up to 5)*</Form.Label>
          <div
            style={{
              position: "relative",
              marginBottom: "10px",
            }}
            ref={skillRef}
          >
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
                if (e.key === "Enter" && skillSuggestionsFiltered.length > 0) {
                  e.preventDefault();
                  handleSkillSelect(skillSuggestionsFiltered[0]);
                }
              }}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
              }}
            >
              🔍
            </span>
            {isSkillDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  maxHeight: "120px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 20,
                  scrollbarWidth: "thin",
                  scrollbarColor: "#888 #f1f1f1",
                }}
              >
                {skillSuggestionsFiltered.map((skill, index) => (
                  <div
                    key={`skill-${index}`}
                    onClick={() => handleSkillSelect(skill)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom:
                        index < skillSuggestionsFiltered.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {skill}
                  </div>
                ))}
                {skillSuggestionsFiltered.length === 0 && (
                  <div
                    style={{
                      padding: "10px",
                      color: "#666",
                    }}
                  >
                    No matching skills
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            {selectedSkills.map((skill, index) => (
              <span
                key={`selected-skill-${skill}-${index}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background:
                    "linear-gradient(180deg, rgba(172, 137, 163, 0.06) 0%, rgba(103, 100, 100, 0.06) 100%)",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  color: "#333",
                }}
              >
                {skill}
                <span
                  onClick={() => handleSkillRemove(skill)}
                  style={{
                    color: "red",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </Form.Group>

        <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "8px" }}>
          Select at least 2 interests and 2 skills, up to 5 each.
        </p>
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
      <Form.Group
        controlId="profilePhoto"
        className="Profile-phot-main-conmmtainer mb-3"
      >
        <Form.Label className="Profile-photo-heading">
          Profile Photo*
        </Form.Label>
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
      <p className="Profileimage-desc">
        Please upload a profile picture to make your connections faster and
        easier.
      </p>
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
        <img
          src={Unispherelogo}
          alt="Unisphere Logo"
          className="top-left-logo"
        />
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
                aria-label={`Step ${s} ${
                  step >= s ? "completed" : "not completed"
                }`}
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