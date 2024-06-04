import React from "react";
import "./Companies.css";


const CompanyCard = ({ company }) => {

    return (
        <div className="Companies-Sub">
            <div className="Companies-Text">
                <h3>{company.name}</h3>
                <p>{company.description}</p>
            </div>
            <div className="Companies-Img">
                <img src={company.logoUrl} />
            </div>
        </div>
    )
}


export default CompanyCard;