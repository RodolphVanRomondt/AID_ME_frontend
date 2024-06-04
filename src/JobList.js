import React, {useState, useEffect, useContext} from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import Job from "./Job";
import JoblyApi from "./Api";
import UserContext from "./UserContext";


const JobList = () => {

    const [formData, setFormData] = useState({searchBar: ""});
    const [jobs, setJobs] = useState([]);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    async function getJobs(name) {
        const jobs = await JoblyApi.getAllJobs(name);
        setJobs(jobs);
    }

    useEffect(() => {
        getJobs();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value.toLowerCase()
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        getJobs(formData.searchBar);
    }

    return (
        <div className="Jobs">
            <Form onSubmit={handleSubmit}>
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
            </Form>
            {jobs.map(
                job => <Job job={job} key={job.id} applyBool={currentUser.applications.includes(job.id)} />
            )}
        </div>
    )
}

export default JobList;