import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./LoginSignUp.css";


const Login = ({ login }) => {

    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    async function handleSubmit (e) {
        e.preventDefault();
        const res = await login(formData);
        if (res.success) {
            history.push("/");
        }
    }

    return (
        <div className="LoginSignUp">
            <Form onSubmit={handleSubmit}>
                <h1>Log In</h1>
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
                <Button>Submit</Button>
            </Form>
        </div>
    )
}


export default Login;