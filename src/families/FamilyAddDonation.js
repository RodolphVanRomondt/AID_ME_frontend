import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";
import DonationCard from "../donations/DonationCard";

const FamilyAddDonation = () => {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [donations, setDonations] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [value, setValue] = useState("");

    const addDonation = donation => {
        const toAdd = donations.filter(e => e.id === +donation);
        setDonationList(p => [...p, toAdd[0]]);

        addDistribution(donation);
    };

    function removeDonation(donation) {
        setDonations(donations.filter(e => e.id !== +donation));
    }

    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    const handleClick = () => {
        history.push(`/families/${id}`);
    }

    useEffect(() => {
        async function getDonation() {
            let donationRes = await AidMeApi.getAllNewDonations(id);

            setDonations(donationRes);
            setIsLoading(false);
        }
        getDonation();

    }, [id]);

    if (isLoading) return <p>Loading &hellip;</p>;

    const handleChange = (e) => {
        if (!e.target.value) return;

        setValue(e.target.value);
        addDonation(e.target.value);
        removeDonation(e.target.value);
    };

    async function addDistribution(donationID) {
        await AidMeApi.postDistribution({ fID: id, dID: +donationID });
    }

    return (
        <div className="FamilyAddDonation">
            <h1>Add Donation To Family</h1>

            <div>
                <select value={value} onChange={handleChange}>
                    <option value="" key={0}>Add</option>
                    {donations.map(e =>
                        <option value={e.id} key={e.id}>{e.description} - {e.start_date.substring(0, 10)}</option>
                    )}
                </select>
                <p>Description - Start Date</p>
                <Button onClick={handleClick}>Back To Family</Button>
            </div>

            <div className="Family-AddDonation">
                {donationList.map(donation =>
                    <DonationCard donation={donation} key={donation.id} />
                )}
            </div>
        </div>
    );
};


export default FamilyAddDonation;