import React, { useState, useEffect, useContext } from "react";
import "./Camp.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import CampCard from "./CampCard";
import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";


const CampList = () => {

    const [camps, setCamps] = useState([]);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    async function getCamps() {
        const camps = await AidMeApi.getAllCamps();
        setCamps(camps);
    }

    useEffect(() => {
        getCamps();
    }, []);

    if (!camps) {
        return <p>Loading &hellip;</p>;
    }

    const handleClick = () => {
        history.push("/new/camp");
    }


    return (
        <div className="CampList">
            <div className="CampListButton">
                <Button onClick={handleClick}>New Camp</Button>
            </div>

            {camps.map(
                camp =>
                    <Link to={`/camps/${camp.id}`} key={camp.id}>
                        <CampCard camp={camp} />
                    </Link>
            )}
        </div>
    )
}


export default CampList;