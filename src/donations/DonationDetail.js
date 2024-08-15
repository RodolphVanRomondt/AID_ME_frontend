import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Donation.css";

import UserContext from "../auth/UserContext";
import AidMeApi from "../Api";



const DonationDetail = () => {
    const { id } = useParams();

    const [donation, setDonation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getDonation() {
            let donation = await AidMeApi.getDonation(id);

            setDonation(donation);
            setIsLoading(false);
        }
        getDonation();

    }, [id]);

    if (isLoading) return <p>Loading &hellip;</p>;

    return (
        <div className="DonationDetail">
            <h1>Donation Detail</h1>
            <div className="DonationCard">
                <h3>{donation.description}</h3>
                <p>Start Date: {donation.start_date}</p>
                <p>End Date: {donation.end_date}</p>
                <p>Target: Family with {donation.target}+ members.</p>
            </div>
        </div>
    )
}


export default DonationDetail;