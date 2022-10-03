import React from "react";

function Notification({ showNotifiaction }) {
  return (
    <div className={`notification-container ${showNotifiaction ? "show" : ""}`}>
      <p>You have already entered this letter</p>
    </div>
  );
}

export default Notification;
