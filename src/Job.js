import React, { useState, useContext } from "react";
import "./Job.css";
import JoblyApi from "./Api";
import UserContext from "./UserContext";

const Job = ({ job, applyBool }) => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [applied, setApplied] = useState(applyBool);

    async function apply() {
        await JoblyApi.applyToJob(currentUser.username, job.id);
        currentUser.applications.push(job.id);
        setApplied(true);
    }

    return (
        <div className="Job">
            <div className="Job-Text">
                <h3>{job.title}</h3>
                <p>{job.companyName}</p>
                <p>Salary: {job.salary ? job.salary : "NULL" }</p>
                <p>Equity: {job.equity ? job.equity : "NULL"}</p>
            </div>
            <button onClick={apply} disabled={applied}>
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    )
}


export default Job;