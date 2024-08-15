import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Profile.css";
import { useHistory } from "react-router-dom";

import UserContext from "../auth/UserContext";


const Profile = ({ patchUser }) => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState(currentUser);

    const history = useHistory();
    if (!currentUser) history.push("/");

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    async function handleSubmit (e) {
        e.preventDefault();

        const res = await patchUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        });

        if (res.success) {
            setCurrentUser(formData);
            history.push("/");
        }
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <Form className="Profile-Form Form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        id="itemName"
                        name="username"
                        value={formData.username}
                        placeholder={formData.username}
                        disabled
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        id="itemDesc"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Last Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        id="itemRecipe"
                        name="lastName"
                        value={formData.lastName}
                        placeholder={formData.lastName}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        id="itemServe"
                        name="email"
                        value={formData.email}
                        placeholder={formData.email}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button>Save Changes</Button>
            </Form>
        </div>
    )
}


export default Profile;