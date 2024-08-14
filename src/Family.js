import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import AidMeApi from "./Api";
import UserContext from "./UserContext";
import Person from "./Person";
import Donation from "./Donation";

import "./family.css";

const Family = () => {

    const { id } = useParams();

    const { currentUser } = useContext(UserContext);
    const [family, setFamily] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // const [formData, setFormData] = useState({ searchBar: "" });

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getFamily() {
            const res = await AidMeApi.getFamily(id);
            setFamily(res);
            setIsLoading(false);
        }
        getFamily();
    }, [id]);

    if (isLoading) return <p>Loading &hellip;</p>;

    const handleClick = () => {
        history.push(`/families/${id}/donations`);
    }

    return (
        <div className="Family">
            <h2>Members</h2>
            {/* <Button className="FamilyButton">Add Member</Button> */}
            {family.members.map(
                person => <Person person={person} key={person.id} />
            )}
            <h2 className="Donation-Text">{!family.donations.length ? "No Donation Yet" : "Donations"}</h2>
            <Button className="DonationAddButton" onClick={handleClick}>Add Donation</Button>
            {family.donations.map(
                donation => <Donation id={donation.id} receive={donation.receive} family_id={family.id} key={donation.id} />
            )}
        </div>
    )
}


export default Family;