import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";  // Import Footer component
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading screen

  useEffect(() => {
    // Simulate a delay for the loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3100); // 3.1 seconds (adjust as needed)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="showcase-container">
          <Showcase />
          <Footer /> {/* Add Footer below the showcase */}
        </div>
      )}
      
    </>
  );
};

export default App;
