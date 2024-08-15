import React from "react";
import "./Camp.css";


const CampCard = ({ camp }) => {

    return (
        <div className="CampCard">
            <h3>{camp.location}</h3>
            <p>City: {camp.city}</p>
            <p>Country: {camp.country}</p>
        </div>
    )
}


export default CampCard;