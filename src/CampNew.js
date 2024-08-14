import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import "./Camp.css";
import UserContext from "./UserContext";
import AidMeApi from "./Api";


const CampNew = () => {

    const INITAL_VALUE = {
        "location": "",
        "city": "",
        "country": ""
    };

    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState(INITAL_VALUE);

    const history = useHistory();
    if (!currentUser) history.push("/");

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        await AidMeApi.postCamp({
            location: formData.location,
            city: formData.city,
            country: formData.country
        });

        history.push("/camps");
    }

    const handleClick = () => {
        history.push("/camps");
    };

    return (
        <div className="Camp">
            <h1>Create New Camp</h1>
            <Form className="Camp-Form Form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        placeholder={formData.location}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>City</Label>
                    <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        placeholder={formData.city}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Country</Label>
                    <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        placeholder={formData.country}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <Button>Create Camp</Button>
                    <Button className="left" onClick={handleClick}>Cancel</Button>
                </div>
                
            </Form>
        </div>
    )
}


export default CampNew;