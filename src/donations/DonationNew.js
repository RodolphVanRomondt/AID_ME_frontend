import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import "./Donation.css";

import UserContext from "../auth/UserContext";
import AidMeApi from "../Api";


const DonationNew = () => {

    const t = new Date();
    const m = t.getMonth() > 8 ? t.getMonth()+1 : `0${t.getMonth()+1}`;
    const d = t.getDate() > 9 ? t.getDate() : `0${t.getDate()}`;

    const min = `${t.getFullYear()}-${m}-${d}`;

    const INITAL_VALUE = {
        "start_date": min,
        "end_date": "",
        "target": "",
        "description": ""
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

        await AidMeApi.postDonation({
            start_date: formData.start_date,
            end_date: formData.end_date,
            target: +formData.target,
            description: formData.description
        });

        history.push("/donations");
    }

    const handleClick = () => {
        history.push("/donations");
    };

    return (
        <div className="DonationNew">
            <Form className="DonationNew-Form Form" onSubmit={handleSubmit}>
                <h1>Create Donation</h1>
                <FormGroup>
                    <Label>Start Date</Label>
                    <Input
                        id="start_date"
                        name="start_date"
                        type="date"
                        min={formData.start_date}
                        max={formData.end_date}
                        value={formData.start_date}
                        placeholder={formData.start_date}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>End Date</Label>
                    <Input
                        id="end_date"
                        name="end_date"
                        type="date"
                        min={formData.start_date}
                        value={formData.end_date}
                        placeholder={formData.end_date}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Target</Label>
                    <Input
                        id="target"
                        name="target"
                        type="number"
                        min="1"
                        value={formData.target}
                        placeholder={formData.target}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        placeholder={formData.description}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <Button>Create Donation</Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </div>

            </Form>
        </div>
    )
}


export default DonationNew;
