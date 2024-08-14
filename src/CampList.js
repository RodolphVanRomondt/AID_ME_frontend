import React, { useState, useEffect, useContext } from "react";
import "./Camp.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import CampCard from "./CampCard";
import AidMeApi from "./Api";
import UserContext from "./UserContext";


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
            {/* <h1>Camps</h1> */}
            <Button onClick={handleClick}>New Camp</Button>
            
            {/* <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        id="searchBar"
                        name="searchBar"
                        value={formData.searchBar}
                        placeholder="Enter Search Term"
                        onChange={handleChange}
                    >
                    </Input>
                    <Button>Submit</Button>
                </FormGroup>
            </Form> */}
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