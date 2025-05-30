import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Books.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();

  // State for books, loading, error, and selected semester
  const [apiBooks, setApiBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null); // null = show all

  // Ref for eBooks list to enable scrolling
  const eBooksListRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("Please log in to view books.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: { userId },
            timeout: 10000,
          }
        );

        const bookData = response.data.data || response.data || [];
        if (!Array.isArray(bookData)) {
          throw new Error("Invalid API response format.");
        }

        // Transform books and extract semester
        const transformedBooks = bookData.map((book) => {
          const semesterMatch = book.key.match(/sem (\d)/i);
          const semester = semesterMatch ? `S${semesterMatch[1]}` : "Unknown";
          return {
            title: book.name || "Untitled Book",
            url: book.url || "https://via.placeholder.com/150",
            semester,
            key: book.key,
          };
        });

        setApiBooks(transformedBooks);
        setLoading(false);
      } catch (error) {
        setError("Failed to load books. Please try again.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books by selected semester
  const filteredBooks = selectedSemester
    ? apiBooks.filter((book) => book.semester === selectedSemester)
    : apiBooks;

  // Handle book click
  const handleBookClick = (book) => {
    window.open(book.url, "_blank");
  };

  // Handle semester button click
  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester === selectedSemester ? null : semester);
  };

  // Handle scrolling for eBooks
  const scrollLeft = () => {
    if (eBooksListRef.current) {
      console.log(
        "Scrolling left",
        eBooksListRef.current.scrollWidth,
        eBooksListRef.current.clientWidth
      );
      eBooksListRef.current.scrollBy({ left: -200, behavior: "smooth" });
      // Fallback
      eBooksListRef.current.scrollLeft -= 200;
    } else {
      console.log("eBooksListRef is not set");
    }
  };

  const scrollRight = () => {
    if (eBooksListRef.current) {
      console.log(
        "Scrolling right",
        eBooksListRef.current.scrollWidth,
        eBooksListRef.current.clientWidth
      );
      eBooksListRef.current.scrollBy({ left: 200, behavior: "smooth" });
      // Fallback
      eBooksListRef.current.scrollLeft += 200;
    } else {
      console.log("eBooksListRef is not set");
    }
  };

  // Render books
  const renderBooks = (books, isMobile = false) => {
    const containerClass = isMobile ? "mobile-eBooks-content" : "main-original-book-eBooks-content";
    const itemClass = isMobile ? "mobile-eBooks-item" : "eBooks-item";
    const imageClass = isMobile ? "mobile-eBooks-image" : "eBooks-image";
    const titleClass = isMobile ? "mobile-eBooks-title" : "eBooks-title";

    return (
      <div className={containerClass}>
        <div
          className={isMobile ? "mobile-eBooks-items-list" : "eBooks-items-list"}
          ref={eBooksListRef}
        >
          {books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={`${book.key}-${index}`}
                className={isMobile ? "" : "eBooks-item-section"}
                onClick={() => handleBookClick(book)}
                style={{ cursor: "pointer" }}
              >
                <div className={itemClass}>
                  <img
                    src="https://via.placeholder.com/150" // Placeholder for PDF
                    alt={book.title}
                    className={imageClass}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  />
                  <div className={isMobile ? "mobile-eBooks-details" : "eBooks-details"}>
                    <h3 className={titleClass}>{book.title}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books available{selectedSemester ? ` for ${selectedSemester}` : ""}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <DesktopNavbar />
      <Background />
      <div className="main-original-book-main-wrapper">
        <h1 className="main-original-book-main-title">
          All you need at one place to be successful in your Student Life.
        </h1>
        <div className="main-original-book-search-container">
          <input type="text" placeholder="Search" className="main-original-book-search-input" />
          <div className="main-original-book-search-options">
            {["S1", "S2", "S3", "S4", "S5", "S6"].map((sem, index) => (
              <button
                key={sem}
                className={`main-original-book-option-button main-original-book-option-button-${
                  index + 1
                } ${selectedSemester === sem ? "selected" : ""}`}
                onClick={() => handleSemesterClick(sem)}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>

        <div className="main-original-book-eBooks-section">
          <div className="eBooks-header">
            <h2 className="main-original-book-section-title-eBooks">
              {selectedSemester ? `${selectedSemester} eBooks` : "eBooks"}
            </h2>
            <div className="eBooks-nav">
              <button
                className="main-original-book-nav-arrow prev"
                onClick={() => {
                  console.log("Prev button clicked");
                  scrollLeft();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="main-original-book-nav-arrow next"
                onClick={() => {
                  console.log("Next button clicked");
                  scrollRight();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loading-spinner">Loading books...</div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            renderBooks(filteredBooks)
          )}
        </div>

        <div className="main-original-book-notes-section">
          <h2 className="main-original-book-section-title-notes">Notes</h2>
          <div className="main-original-book-notes-content">
            <p>Coming Soon</p>
          </div>
        </div>

        <div className="main-original-book-university-section">
          <h2 className="main-original-book-section-title-university">
            Preferred by top Universities
          </h2>
          <div className="main-original-book-university-content">
            <p>Coming Soon</p>
          </div>
        </div>

        <div className="main-original-book-lifeLesson-section">
          <h2 className="main-original-book-section-title-lifeLesson">Life Lesson</h2>
          <div className="main-original-book-lifeLesson-content">
            <p>Coming Soon</p>
          </div>
        </div>
      </div>

      <div className="mobile-section-view-parent">
        <div className="mobile-main-original-book-main-wrapper">
          <div className="mobile-main-original-book-parent">
            <div className="mobile-original-book-main-heading">
              <span
                className="mobile-original-book-backIcon"
                onClick={() => {
                  console.log("Back button clicked");
                  navigate(-1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
              <h1 className="mobile-main-original-book-main-title">
                All you need at one place to be successful in your Student Life.
              </h1>
            </div>
            <div className="mobile-main-original-book-search-container">
              <input
                type="text"
                placeholder="Search"
                className="mobile-main-original-book-search-input"
              />
              <div className="mobile-main-original-book-search-options">
                {["S1", "S2", "S3", "S4", "S5", "S6"].map((sem, index) => (
                  <button
                    key={sem}
                    className={`mobile-main-original-book-option-button main-original-book-option-button-${
                      index + 1
                    } ${selectedSemester === sem ? "selected" : ""}`}
                    onClick={() => handleSemesterClick(sem)}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-eBooks-section">
              <div className="mobile-eBooks-header">
                <h2 className="mobile-main-original-book-section-title-eBooks">
                  {selectedSemester ? `${selectedSemester} eBooks` : "eBooks"}
                </h2>
                <div className="mobile-eBooks-nav">
                  <button
                    className="mobile-eBooks-nav-arrow prev"
                    onClick={() => {
                      console.log("Mobile prev button clicked");
                      scrollLeft();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="mobile-eBooks-nav-arrow next"
                    onClick={() => {
                      console.log("Mobile next button clicked");
                      scrollRight();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="loading-spinner">Loading books...</div>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                renderBooks(filteredBooks, true)
              )}
            </div>

            <div className="mobile-main-original-book-notes-section">
              <h2 className="mobile-main-original-book-section-title-notes">Notes</h2>
              <div className="mobile-main-original-book-notes-content">
                <p>Coming Soon</p>
              </div>
            </div>

            <div className="mobile-main-original-book-university-section">
              <h2 className="mobile-main-original-book-section-title-university">
                Preferred by top Universities
              </h2>
              <div className="mobile-main-original-book-university-content">
                <p>Coming Soon</p>
              </div>
            </div>

            <div className="mobile-main-original-book-lifeLesson-section">
              <h2 className="mobile-main-original-book-section-title-lifeLesson">Life Lesson</h2>
              <div className="mobile-main-original-book-lifeLesson-content">
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;