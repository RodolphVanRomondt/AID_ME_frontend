import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Donation.css";

import UserContext from "../auth/UserContext";


const DonationCard = ({ donation }) => {

    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    return (
        <div className="DonationCard">
            <h3>{donation.description}</h3>
            <p><b>Target</b>: Family with {donation.target}+ members.</p>
        </div>
    )
}


export default DonationCard;