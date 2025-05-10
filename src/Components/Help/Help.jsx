import { RxCross2 } from "react-icons/rx";
import "./Help.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";

export default function Help() {
  return (
    <>
    <div className="help-from-desktop-navbar">
        <DesktopNavbar/>
    </div>
      <div className="help-form-page">
        <div className="help-form-heading-and-cross">
          <h1 className="help-form-title">Help</h1>
          <RxCross2 className="help-from-crossIcon" />
        </div>
        <div className="help-form-container">
          <p className="help-form-message">
            We will love to help with any problem you are facing.
          </p>

          <div className="help-form-input-group">
            <div className="help-form-input-and-label">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" className="help-form-input" />
            </div>

            <div className="help-form-input-and-label">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" className="help-form-input" />
            </div>

            <div className="help-form-input-and-label ">
              <label htmlFor="problem">Problem you are facing </label>
              <textarea
                type="text"
                name="problem"
                className="help-form-input "
              ></textarea>
            </div>
          </div>
          <div className="help-form-buttons">
            <button className="help-form-button help-form-button-cancel">
              Cancel
            </button>
            <button className="help-form-button help-form-button-submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
