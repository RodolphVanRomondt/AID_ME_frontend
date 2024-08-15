import React, { useState, useEffect, useContext } from "react";
import "./Donation.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import DonationCard from "./DonationCard";

import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";


const DonationList = () => {

    const [donations, setDonations] = useState([]);
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getDonations() {
            const donations = await AidMeApi.getAllDonations();
            setDonations(donations);
            setIsLoading(false);
        }
        getDonations();
    }, []);

    if (isLoading) return <p>Loading &hellip;</p>;

    const handleClick = () => {
        history.push("/new/donation");
    }

    return (
        <div className="DonationList">
            <div className="DonationList-Button">
                <Button onClick={handleClick}>New Donation</Button>
            </div>
            {donations.map(
                donation =>
                    <Link to={`/donations/${donation.id}`} key={donation.id}>
                        <DonationCard donation={donation}  />
                    </Link>
            )}
        </div>
    )
}


export default DonationList;