import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import "./person.css";

import UserContext from "../auth/UserContext";
import AidMeApi from "../Api";


const PersonNew = () => {

    const INITAL_VALUE = {
        "first_name": "",
        "last_name": "",
        "dob": "",
        "sex": "",
        "nid": ""
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

        try {
            await AidMeApi.postPerson({ ...formData, sex: formData.sex[0].toLowerCase() });
            history.push("/");
        } catch (e) {
            history.push("/");
        }
    }

    const handleClick = () => {
        history.push("/");
    };

    return (
        <div className="PersonNew">
            <Form className="PersonNew-Form Form" onSubmit={handleSubmit}>
                <h1>Create Person</h1>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        placeholder={formData.first_name}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        placeholder={formData.last_name}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Date Of Birth</Label>
                    <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        placeholder={formData.dob}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="sex">
                        Sex
                    </Label>
                    <Input
                        id="sex"
                        name="sex"
                        type="select"
                        onChange={handleChange}
                    >
                        <option>
                        </option>
                        <option>
                            Male
                        </option>
                        <option>
                            Female
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>National ID</Label>
                    <Input
                        id="nid"
                        name="nid"
                        value={formData.nid}
                        placeholder="ex.: 00-0"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <Button>Add Person</Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </div>

            </Form>
        </div>
    )
}


export default PersonNew;
