import React from "react";
import "./Camp.css";


const PersonCard = ({ person, value, removePerson }) => {

    // function handleRemove(e) {
    //     removePerson(value);
    // }

    return (
        <div className="CampCard">
            <div className="CampCard-Text">
                <p>Full Name: {person.first_name} {person.last_name}</p>
                <p>Sex: {person.sex === "m" ? "Male" : "Female"}</p>
                <p>NID: {person.nid}</p>
                {/* <button className="bi bi-trash-fill btn btn-outline-danger btn-sm" onClick={handleRemove}>Delete</button> */}
            </div>
        </div>
    )
}


export default PersonCard;