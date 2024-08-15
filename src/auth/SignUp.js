import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";


const SignUp = ({signup}) => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""

    });
    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    async function handleSubmit (e) {
        e.preventDefault();
        const res = await signup(formData);
        if (res.success) {
            history.push("/");
        }
    }

    return (
        <div className="LoginSignUp">
            <Form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        placeholder="Username"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}


export default SignUp;