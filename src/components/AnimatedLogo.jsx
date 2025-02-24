import React, { useEffect, useRef, useState } from "react";
import "../css/AnimatedLogo.css"; // Import the CSS file

const AnimatedLogo = () => {
  const [textVisible, setTextVisible] = useState(false); // State to control text visibility
  const [secondTextVisible, setSecondTextVisible] = useState(false); // State for second text
  const logoRef = useRef(null); // Reference to the logo element

  useEffect(() => {
    const logoElement = logoRef.current;

    // Listen for the end of the initial animation to show the text
    const handleAnimationEnd = () => {
      setTextVisible(true); // Trigger "Presents" text visibility after logo animation ends
      setTimeout(() => setSecondTextVisible(true), 100); // Show "Best moments ever" after 1 second
    };

    if (logoElement) {
      logoElement.addEventListener("animationend", handleAnimationEnd);
    }

    // Cleanup listener on unmount
    return () => {
      if (logoElement) {
        logoElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div className="logo-container">
      <img src="./logomm.png" alt="Logo" className="logo" ref={logoRef} />
      {textVisible && <div className="present-text">Presents:</div>}
      {secondTextVisible && 
      <div className="best-moments-text">Best Moments of 2024</div>
      }
    </div>
  );
};

export default AnimatedLogo;
