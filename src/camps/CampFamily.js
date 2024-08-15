import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import AidMeApi from "../Api";
import UserContext from "../auth/UserContext";
import PersonCard from "../person/PersonCard";

const CampFamily = () => {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [people, setPeople] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [value, setValue] = useState("");
    const [family, setFamily] = useState(null);

    const addPerson = person => {
        const toAdd = people.filter(e => e.id === +person);
        setPersonList(p => [...p, toAdd[0]]);

        addFamilyMember(person);
    };

    function removePerson(person) {
        setPeople(people.filter(e => e.id !== +person));
    }

    function removePersonInList(id) {
        const toRemove = personList.filter(p => p.id === +id);
        setPersonList(personList.filter(p => p.id !== +id));
        setPeople(p => [...p, toRemove[0]]);
    }

    const { currentUser } = useContext(UserContext);

    const history = useHistory();
    if (!currentUser) history.push("/");

    const handleClick = () => {
        history.push(`/camps/${id}`);
    }

    useEffect(() => {
        async function getCamp() {
            let people = await AidMeApi.getAllHousehold();

            setPeople(people);
            setIsLoading(false);
        }
        getCamp();

    }, []);

    if (isLoading) return <p>Loading &hellip;</p>;

    const handleChange = (e) => {
        if (!e.target.value) return;

        setValue(e.target.value);
        addPerson(e.target.value);
        removePerson(e.target.value);
    };
    
    async function addFamilyMember(personID) {

        if (!personList.length) {
            const family = await AidMeApi.postFamily({ camp_id: +id, head: +personID });
            setFamily(family);

            await AidMeApi.postHousehold({ family_id: family.id, person_id: personID });
        } else {
            await AidMeApi.postHousehold({ family_id: family.id, person_id: personID });
        }
    }

    return (
        <div className="CampFamily">
            <h1>Camp Add Family Members</h1>

            <div>
                <select value={value} onChange={handleChange}>
                    <option value="" key={0}>Add</option>
                    {people.map(e =>
                        <option value={e.id} key={e.id}>{e.first_name} {e.last_name}</option>
                    )}
                </select>
                <p>{!personList.length ? "Head Of Family" : "Other Members"}</p>
                <Button onClick={handleClick}>Back To Camps</Button>
            </div>
            
            {personList.map(person =>
                <PersonCard
                    person={person}
                    value={person.id}
                    removePerson={e => removePersonInList(person.id)}
                    key={person.id} />
            )}
        </div>
    );
};


export default CampFamily;