import React, { useEffect, useState } from "react";
import "../css/LoadingScreen.css";

// Logo images (Actual icon URLs)
const logos = [
  { name: "React", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg" },
  
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/nodedotjs.svg" },
  { name: "Typescript", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/typescript.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/postgresql.svg" },
  { name: "OSM", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/openstreetmap.svg" },
  { name: "Leaflet", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/leaflet.svg" },
  { name: "OpenAI", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/openai.svg" },
  { name: "HTML5", src: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/html5.svg" },
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 3000; // Total animation time for progress bar (5 seconds)

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progressValue = Math.min((elapsed / duration) * 100, 100); // Calculate progress as a percentage

      setProgress(progressValue);

      if (progressValue < 100) {
        requestAnimationFrame(animateProgress); // Continue animation
      }
    };

    const progressAnimation = requestAnimationFrame(animateProgress);

    // Logo flashing every 1 second
    const logoInterval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % logos.length);
    }, 250);

    return () => {
      cancelAnimationFrame(progressAnimation); // Cleanup animation frame
      clearInterval(logoInterval); // Cleanup logo interval
    };
  }, []);

  return (
    <div className="loading-screen">
      {/* Flashing logo */}
      <div className="logo-container">
        <img
          src={logos[currentLogoIndex].src}
          alt={logos[currentLogoIndex].name}
          className="flashing-logo"
        />
        <p>{logos[currentLogoIndex].name}</p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
