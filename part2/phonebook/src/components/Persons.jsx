import { del } from "../services/phoneBook"

function Persons({ personInfo, handleDelete }) {
    const name = personInfo.map((person) => {
        return (
            <div key={person.id}>
                <p>
                    {person.name} {person.newPhone}
                    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
                </p>
            </div>
        )
    })
    return (
        <div>
            {name}
        </div>
    )
}

export default Persons;