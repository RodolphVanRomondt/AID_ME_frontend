import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams, Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import AidMeApi from "./Api";
import UserContext from "./UserContext";
import FamilyCard from "./FamilyCard";


const CampDetail = () => {
    const { id } = useParams();

    const [camp, setCamp] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getCamp() {
            let camp = await AidMeApi.getCamp(id);

            setCamp(camp);
            setIsLoading(false);
        }
        getCamp();

    }, [id]);

    if (isLoading) return <p>Loading &hellip;</p>;
    if (!camp) return <Redirect to="/camps" />;

    const handleClick = () => {
        history.push(`/camp/${id}/family`);
    };

    return (
        <div className="CampDetail">
            <h1>Camp</h1>
            <div>
                <p>Add Family To Camp.</p>
                <Button onClick={handleClick}>Add</Button>
                
            </div>
            <div className="CampDetail-Text">
                <h2>{camp.location}</h2>
                <p>{camp.city}, {camp.country}</p>
                <p></p>
                <p>There is {camp.families.length} {camp.families.length > 1? "families": "family"} in this camp.</p>
            </div>
            <div>
                {camp.families.map(
                    id =>
                        <Link to={`/families/${id}`} key={id}>
                            <FamilyCard id={id} />
                        </Link>
                )}
            </div>
        </div>
    )
}


export default CampDetail;