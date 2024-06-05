import React, {useState, useEffect, useContext} from "react";
import { Redirect, useParams } from "react-router-dom";
import JoblyApi from "./Api";
import Job from "./Job";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";


const CompanyDetail = () => {
    const { handle } = useParams();

    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);

            setCompany(company);
            setIsLoading(false);
        }
        getCompany();

    }, []);

    if (isLoading) return <p>Loading &hellip;</p>;
    if (!company) return <Redirect to="/companies" />;

    return (
        <div className="Company">
            <div className="Company-Text">
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            {company.jobs.map(
                job => <Job job={job} key={job.id} applyBool={currentUser.applications.includes(job.id)}/>
            )}
        </div>
    )
}


export default CompanyDetail;