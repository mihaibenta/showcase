import React, { useState } from "react";
import "../css/Showcase.css";

// Path to the shared video file
import EarthVideo from "../assets/video/earth_video.mp4";
import GeoLiveMap from "../assets/video/geolivemap.mp4";
import ShopVideo from "../assets/video/shop_video.mp4";
import QRVideo from "../assets/video/QR_video.mp4";
// import EcommerceVideo from "../assets/video/ecommerce_video.mp4"; // Add the video for the Simply E-Commerce app

const apps = [
  {
    name: "PhotoEventsBooking",
    description: "A complex photography & videography website incorporating modern design, 3d models using ThreeJS, a booking system, and an interactive price quiz generator.",
    technologies: ["React", "React Router", "Node.js", "PostgreSQL", "REST API", "Three.js"], 
    link: "https://mmfotovideo.ro",
    video: EarthVideo,
  },
  {
    name: "GeoLiveMap",
    description: "A dynamic and interactive web map equipped with location tracking, GPS recording, and the ability to fetch and display points of interest (POI) and map elements in real-time. It features hazard reporting, POI creation, live location search, reverse geocoding, and integrates OpenAI's GPT model for advanced image interpretation.",
    technologies: ["React", "Context API", "Leaflet", "OSM API", "Geolocation API", "OpenAI API", "Canvas API", "Node.js", "PostgreSQL"],
    link: "https://osm-city-map.onrender.com",
    video: GeoLiveMap,
  },
  {
    name: "QrEvents",
    description: "An event management system featuring QR-based event access and integration with WordPress CMS & REST API.",
    technologies: ["React", "Node.js", "Express", "WordPress REST API", "PHP"],
    link: "https://mmfotovideo.com/events/qr-events-demo/",
    
    video:QRVideo,
  },
  {
    name: "Simply E-Commerce (Demo)",
    description: "A simple e-commerce store with a clean, modern interface for buying and selling products. It integrates with Stripe for secure payments, Firebase Authentication for user login, and Contentful CMS for managing products.",
    technologies: ["React", "Context API", "Contentful CMS", "GraphQL", "Stripe", "Firebase Auth"],
    link: "https://comfy-e-store.netlify.app/", // Replace with your actual link
    video: ShopVideo,
    // video: EcommerceVideo, // Replace with your actual video path
  },
];

const Showcase = () => {
  // Track loading states for each video
  const [loadedStates, setLoadedStates] = useState(
    new Array(apps.length).fill(false) // Initialize all videos as not loaded
  );

  const handleVideoLoad = (index) => {
    setLoadedStates((prev) => {
      const updated = [...prev];
      updated[index] = true; // Mark the specific video as loaded
      return updated;
    });
  };

  return (
    <div className="showcase-container">
      {apps.map((app, index) => (
        <div key={index} className="showcase-item">
          {/* Left: Video */}
          <div className="showcase-media">
            {/* Show spinner while video is loading */}
            {!loadedStates[index] && (
              <div className="spinner">
                <div className="loading-spinner"></div>
              </div>
            )}

            {/* Render video */}
            <video
              src={app.video}
              alt={app.name}
              style={{ display: loadedStates[index] ? "block" : "none" }} // Show only after loaded
              onLoadedData={() => handleVideoLoad(index)} // Call when the video loads
              autoPlay
              loop
              muted
            />
          </div>

          {/* Right: Details */}
          <div className="showcase-details">
            <h2 className="app-name">{app.name}</h2>
            <p className="app-description">{app.description}</p>
            <div className="technologies">
              {app.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            {app.git && (
              <a href={app.git} target="_blank" rel="noopener noreferrer" className="github-link">
                View on GitHub
              </a>
            )}
            <a href={app.link} target="_blank" rel="noopener noreferrer" className="app-link">
              View App
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Showcase;
