import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import "./family.css";

import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";
import Person from "../person/Person";
import Donation from "../donations/Donation";



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
            <h2>{!family.donations.length ? "No Donation Yet" : "Donations"}</h2>
            <div className="DonationAddButton">
                <Button onClick={handleClick}>Add Donation</Button>
            </div>
            {family.donations.map(
                donation => <Donation id={donation.id} receive={donation.receive} family_id={family.id} key={donation.id} />
            )}
            
        </div>
    )
}


export default Family;