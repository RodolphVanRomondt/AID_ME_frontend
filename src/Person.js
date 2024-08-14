import React from "react";
// import "./Companies.css";
import "./person.css";


const Person = ({ person }) => {

    return (
        <div className="Person">
            <div className="Person-Text">
                
                <p>Full Name: {person.first_name} {person.last_name}</p>
                <p>DOB: {person.dob}</p>
                <p>Sex: {person.sex === "m"? "Male": "Female"}</p>
                <p>NID: {person.nid}</p>
                <p>Head : {person.head}</p>
            </div>
        </div>
    )
}


export default Person;