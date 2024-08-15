import React from "react";
import "./person.css";


const PersonCard = ({ person, value, removePerson }) => {

    return (
        <div className="PersonCard">
            <p>Full Name: {person.first_name} {person.last_name}</p>
            <p>Sex: {person.sex === "m" ? "Male" : "Female"}</p>
            <p>NID: {person.nid}</p>
            {/* <button className="bi bi-trash-fill btn btn-outline-danger btn-sm" onClick={handleRemove}>Delete</button> */}
        </div>
    )
}


export default PersonCard;