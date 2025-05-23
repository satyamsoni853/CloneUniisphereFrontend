import DeveloperPic from "./DeveloperPic.svg";
import SliderPic from "./SliderPic.svg";
import WavePic from "./wave.svg";
import buttonImg from "./buttonImg.svg";
import girlSvg from "./girlSvg.svg";
import boySvg from "./boySvg.svg";
import boyRectangle from "./boyRectangle.svg";
import girlRectangle from "./girlRectangle.svg";
import firstSvg from "./firstSvg.svg";
import secondSvg from "./secondSvg.svg";
import thirdSvg from "./thirdSvg.svg";
import rightSectionProfileSvg from "./rightSectionProfileSvg.svg";
import { IoArrowBackCircleOutline, IoFilter, IoSearch } from "react-icons/io5";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";
import Background from "../Background/Background.jsx";
import MobileNavbar from "../MobileNavbar/MobileNavbar.jsx";
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import "./InternshipSection.css";
import { Link } from "react-router-dom";

const InternshipSection = () => {
  return (
    <>
      <div className="Another-Internship-section-desktop-navbar-and-background">
        <DesktopNavbar />
        <MobileNavbar />
        <Background />
      </div>
      <div className="Another-Internship-section-main-container">
        <div className="Another-Internship-section-search-bar">
          <div className="Another-Internship-section-search-container">
            <input
              type="text"
              placeholder="Search for any service"
              className="Another-Internship-section-search-input"
            />
            <div className="Another-Internship-section-search-icon">
              <IoSearch />
            </div>
          </div>
          <button className="Another-Internship-section-filter-button">
            All Filter <IoFilter />
          </button>

          <Link className="Another-Internship-section-nav-link">
            Post Internship
          </Link>
          <Link className="Another-Internship-section-nav-link">About</Link>
        </div>

        <div className="Another-Internship-section-content-container">
          <div className="Another-Internship-section-content-container-left">
            <div className="Another-Internship-section-content-description">
              <div className="Another-Internship-section-content-blur"></div>
              <div className="Another-Internship-section-one-line">
                Internships that
                <div className="Another-Internship-section-right-circle">
                  <div className="Another-Internship-section-left-circle">
                    <div className="Another-Internship-section-inner-border">
                      <div className="Another-Internship-section-inner-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Another-Internship-section-one-line">
                {" "}
                enhance{" "}
                <div className="Another-Internship-section-profile-border">
                  <div className="Another-Internship-section-profile-div">
                    <img src={DeveloperPic} alt="" />
                  </div>
                </div>
                your
              </div>
              <div className="Another-Internship-section-one-line">
                Profile
                <div className="Another-Internship-section-slider-bar-section">
                  <div className="Another-Internship-section-slider-bar">
                    <div className="Another-Internship-section-horizontal-slide"></div>
                    <div className="Another-Internship-section-vertical-slide"></div>
                  </div>
                  <div className="Another-Internship-section-slider-photos">
                    <img src={SliderPic} alt="SliderPic" />
                    <img src={SliderPic} alt="SliderPic" />
                    <img src={SliderPic} alt="SliderPic" />
                  </div>
                </div>
              </div>
              <div className="Another-Internship-section-one-line">
                <img src={WavePic} alt="" />
              </div>
              <div className="Another-Internship-section-last-para">
                in there respective fields. To get the shortcuts success.Book
                and
              </div>
            </div>
            <div className="Another-Internship-section-buttons">
              <button className="Another-Internship-section-left-button">
                Explore
              </button>
              <button className="Another-Internship-section-right-button">
                <img src={buttonImg} alt="" />
              </button>
            </div>
          </div>
          <div className="Another-Internship-section-content-container-right">
            <div className="Another-Internship-section-content-right-top">
              <div className="Another-Internship-section-top-left">
                <img src={girlRectangle} alt="" />
                <img src={girlSvg} alt="" />
              </div>
              <div className="Another-Internship-section-top-right">
                <div className="Another-Internship-section-small-images-section">
                  <div className="Another-Internship-section-image">
                    <img src={firstSvg} alt="" />
                  </div>
                  <div className="Another-Internship-section-image">
                    <img src={secondSvg} alt="" />
                  </div>
                  <div className="Another-Internship-section-image">
                    <img src={thirdSvg} alt="" />
                  </div>
                </div>
                <div className="Another-Internship-section-boy-div">
                  <img src={boyRectangle} alt="" />
                  <img src={boySvg} alt="" />
                </div>
              </div>
            </div>

            <div className="Another-Internship-section-content-right-down">
              <div className="Another-Internship-section-content-right-first-child">
                <h1>Latest</h1>
                <h3>Frontend</h3>
                <h3>UI/UX</h3>
                <h3>Backend</h3>
              </div>
              <div className="Another-Internship-section-content-right-second-child">
                <div className="Another-Internship-section-content-right-image">
                  <img src={rightSectionProfileSvg} alt="" />
                </div>
                <h1>1.2k</h1>
                <div className="Another-Internship-section-content-right-buttons">
                  <button>
                    UI/UX <span>219</span>
                  </button>
                  <button>
                    Frontend <span>451</span>
                  </button>
                  <button>
                    Backend <span>999</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-Internship-section-main-container">
        <nav className="mobile-Internship-nav">
          <div className="mobile-Internship-back-arrow">
            {" "}
            <IoArrowBackCircleOutline />{" "}
          </div>
          <div className="mobile-Internship-nav-links">
            <Link href="#" className="mobile-Internship-nav-link">
              Find Gigs
            </Link>
            <Link href="#" className="mobile-Internship-nav-link">
              Post Gigs
            </Link>
          </div>
        </nav>
      </div>

      <div className="mobile-Internship-section-search-bar">
        <div className="mobile-Internship-section-search-container">
          <input
            type="text"
            placeholder="Search Internship"
            className="mobile-Internship-section-search-input"
          />
          <div className="mobile-Internship-section-search-icon">
            <IoSearch className="mobile-Internship-section-icon" />
          </div>
        </div>
        <button className="mobile-Internship-section-filter-button">
          All Filter <IoFilter className="mobile-Internship-section-icon" />
        </button>
      </div>

      <div className="mobile-Internship-section-content-container">
        <div className="mobile-Internship-section-content-container-left">
          <div className="mobile-Internship-section-content-description">
            <div className="mobile-Internship-section-content-blur"></div>
            <div className="mobile-Internship-section-one-line">
              Internships that
              <div className="mobile-Internship-section-right-circle">
                <div className="mobile-Internship-section-left-circle">
                  <div className="mobile-Internship-section-inner-border">
                    <div className="mobile-Internship-section-inner-white"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-Internship-section-one-line">
              {" "}
              enhance{" "}
              <div className="mobile-Internship-section-profile-border">
                <div className="mobile-Internship-section-profile-div">
                  <img src={DeveloperPic} alt="" />
                </div>
              </div>
              your
            </div>
            <div className="mobile-Internship-section-one-line">
              Profile
              <div className="mobile-Internship-section-slider-bar-section">
                <div className="mobile-Internship-section-slider-bar">
                  <div className="mobile-Internship-section-horizontal-slide"></div>
                  <div className="mobile-Internship-section-vertical-slide"></div>
                </div>
                <div className="mobile-Internship-section-slider-photos">
                  <img src={SliderPic} alt="SliderPic" />
                  <img src={SliderPic} alt="SliderPic" />
                  <img src={SliderPic} alt="SliderPic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-Internship-section-content-container-right">
          <div className="mobile-Internship-section-content-right-top">
            <div className="mobile-Internship-section-top-left">
              <img src={girlSvg} alt="" />
            </div>
            <div className="mobile-Internship-section-top-right">
              <div className="mobile-Internship-section-small-images-section">
                <div className="mobile-Internship-section-image">
                  <img src={firstSvg} alt="" />
                </div>
                <div className="mobile-Internship-section-image">
                  <img src={secondSvg} alt="" />
                </div>
                <div className="mobile-Internship-section-image">
                  <img src={thirdSvg} alt="" />
                </div>
              </div>
              <div className="mobile-Internship-section-boy-div">
                <img src={boyRectangle} alt="" />
                <img src={boySvg} alt="" />
              </div>
            </div>
          </div>

          <div className="mobile-Internship-section-content-right-down">
            <div className="mobile-Internship-section-content-right-first-child">
              <h1>Latest</h1>
              <h3>Frontend</h3>
              <h3>UI/UX</h3>
              <h3>Backend</h3>
            </div>
            <div className="mobile-Internship-section-content-right-second-child">
              <div className="mobile-Internship-section-content-right-image">
                <img src={rightSectionProfileSvg} alt="" />
              </div>
              <h1>1.2k</h1>
              <div className="mobile-Internship-section-content-right-buttons">
                <button>
                  UI/UX <span>219</span>
                </button>
                <button>
                  Frontend <span>451</span>
                </button>
                <button>
                  Backend <span>999</span>
                </button>
              </div>
            </div>

            <div className="mobile-Internship-section-buttons">
              <button className="mobile-Internship-section-left-button">
                Explore
              </button>
              <button className="mobile-Internship-section-right-button">
                <img src={buttonImg} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-Internship-footer">
        <MobileFooter />
      </div>
    </>
  );
};

export default InternshipSection;
