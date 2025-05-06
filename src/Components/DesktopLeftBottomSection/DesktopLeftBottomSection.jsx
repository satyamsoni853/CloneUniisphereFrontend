import React, { useState } from "react";
import "./DesktopLeftBottomSection.css";
import image1 from "./Image1.png";
import image2 from "./Image2.png";
import image3 from "./Image3.png";
import Feature from "../Feature/Feature";

function DesktopLeftBottomSection() {
  const [suggestedItems, setSuggestedItems] = useState([
    { id: 1, topic: "Physics: Sem 2", author: "R.S Aggarwal", image: image1 },
    { id: 2, topic: "The SAGA", author: "Yash Sharma", image: image2 },
    { id: 3, topic: "Maths: Sem 5", author: "Oswal Production", image: image3 },
  ]);

  return (
    <div className="Leftsectionbottom-main-container">
      <div className="leftsectionbottom-1">
        <h3 className="leftsectionbottom-1-heading">Suggested</h3>
        {/* Events */}
        {suggestedItems.map((val) => (
          <div className="leftsectionbottom-1-event" key={val.id}>
            <img
              src={val.image}
              alt={`Event ${val.id}`}
              className="leftsectionbottom-1-image"
            />
            <div className="leftsectionbottom-1-details">
              <p className="leftsectionbottom-1-date">{val.topic}</p>
              <p className="leftsectionbottom-1-location">{val.author}</p>
            </div>
            <a href="#" className="leftsectionbottom-1-link">
              Read More
            </a>
          </div>
        ))}
        <p className="leftsectionbottom-1-button">See All</p>
        {/* Overlay for Coming Soon */}
        <div className="leftsectionbottom-1-overlay">
          <h3 className="leftsectionbottom-1-overlay-heading">Coming Soon</h3>
          <p className="leftsectionbottom-1-overlay-powered">Powered by AI/ML</p>
        </div>
      </div>
      <Feature />
    </div>
  );
}

export default DesktopLeftBottomSection;