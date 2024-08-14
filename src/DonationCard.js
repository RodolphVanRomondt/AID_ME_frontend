import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import "./Donation.css";


const DonationCard = ({ donation }) => {

    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    return (
        <div className="DonationCard">
            <div className="DonationCard-Text">
                <h3>{donation.description}</h3>
                <p>Target: Family with {donation.target}+ members.</p>
            </div>
        </div>
    )
}


export default DonationCard;