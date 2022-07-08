import React from 'react';
import './DashCard.css';

const DashCard = ({ title, value }) => {
    return (
        <div className="dash-card">
        <h3>{title}</h3>
        <p>{value}</p>
        </div>
    )
}

export default DashCard;