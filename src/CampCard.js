import React from "react";
import "./Camp.css";


const CampCard = ({ camp }) => {

    return (
        <div className="CampCard">
            <div className="CampCard-Text">
                <h3>{camp.location}</h3>
                <p>City: {camp.city}</p>
                <p>Country: {camp.country}</p>
            </div>
        </div>
    )
}


export default CampCard;