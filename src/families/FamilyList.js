import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FamilyCard from "./FamilyCard";

import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";


const FamilyList = () => {
    
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [families, setFamilies] = useState([]);

    const history = useHistory();
    if (!currentUser) history.push("/");

    async function getFamilies() {
        const families = await AidMeApi.getAllFamilies();
        setFamilies(families);
        setIsLoading(false);
    }

    useEffect(() => {
        getFamilies();
    }, []);

    if (isLoading) return <p>Loading &hellip;</p>;

    return (
        <div className="FamilyList">
            <h1>Families</h1>
            {families.map(
                family =>
                    <Link to={`/families/${family.id}`} key={family.id}>
                        <FamilyCard id={family.id} />
                    </Link>
            )}
        </div>
    )
}

export default FamilyList;