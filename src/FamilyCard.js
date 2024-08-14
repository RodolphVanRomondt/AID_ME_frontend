import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import "./Camp.css";
import AidMeApi from "./Api";


const FamilyCard = ({ id }) => {

    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);
    const [family, setFamily] = useState({});

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getFamily() {
            let family = await AidMeApi.getFamily(id);

            setFamily(family);
            setIsLoading(false);
        }
        getFamily();

    }, [id]);

    if (isLoading) return <p>Loading &hellip;</p>;
    // if (!family.id) return <Redirect to="/camps" />;

    return (
        <div className="FamilyCard">
            <div className="FamilyCard-Text">
                <p>Members: {family.members.length}</p>
                <p>Donations: {family.donations.length}</p>
            </div>
        </div>
    )
}


export default FamilyCard;