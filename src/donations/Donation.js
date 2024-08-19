import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import "./Donation.css";

import UserContext from "../auth/UserContext";
import AidMeApi from "../Api";


const Donation = ({ id, receive, family }) => {

    const { currentUser } = useContext(UserContext);
    const [donation, setDonation] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [received, setReceived] = useState(receive);

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getDonation() {
            const donation = await AidMeApi.getDonation(id);
            setDonation(donation);
            setIsLoading(false);
        }
        getDonation();
    }, []);

    if (isLoading) return <p>Loading &hellip;</p>;

    async function handleClick(e) {
        setReceived(true);
        await AidMeApi.patchDistribution({ fID: family, dID: id });
    }

    return (
        <div className="Donation">
            <p><b>{donation.description}</b></p>
            <p>Start Date: {donation.start_date}</p>
            <p>End Date: {donation.end_date}</p>
            <Button onClick={handleClick} disabled={received} className={received ? "btn-danger" : ""}>{received ? "Received" : "Receive"}</Button>
        </div>
    )
}


export default Donation;