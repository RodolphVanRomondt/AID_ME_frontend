import React, { useState, useEffect } from "react";
import "./Companies.css";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./Api";


const CompanyList = ({user}) => {

    const [formData, setFormData] = useState({searchBar: ""});
    const [companies, setCompanies] = useState([]);

    const history = useHistory();
    if (!user) history.push("/");

    async function getCompanies(name) {
        const companies = await JoblyApi.getAllCompanies(name);
        setCompanies(companies);
    }

    useEffect(() => {
        getCompanies();
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
        getCompanies(formData.searchBar);
    }

    if (!companies) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="Companies">
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
            {companies.map(
                company =>
                    <Link to={`/companies/${company.handle}`} key={company.handle}>
                        <CompanyCard company={company} />
                    </Link>
            )}
        </div>
    )
}


export default CompanyList;