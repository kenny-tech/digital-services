import React from "react";
import '../css/Spinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
        <p>Loading Packages</p>
        <div className="loading-spinner">
        </div>
    </div>
  );
}