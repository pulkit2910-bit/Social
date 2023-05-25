import React from "react";
import "./InfoCard.css";

const InfoCard = () => {
  return (
    <div className="InfoCard">
      <h2>Bio</h2>
      <div className="info-list">
        <div className="info">
          <span>City : </span>
          <span>Ranchi</span>
        </div>
        <div className="info">
          <span>From : </span>
          <span>India</span>
        </div>
        <div className="info">
          <span>Relationship : </span>
          <span>Single</span>
        </div>
        <div className="info">
          <span>Education : </span>
          <span>CSE, BIT Mesra</span>
        </div>
        <div className="info">
          <span>Job : </span>
          <span>SDE</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
