function Persons({persons}) {
    const name = persons.map((person) => {
        return (
            <p key={person.id}>{person.name} {person.newPhone}</p>
        )
    })
    return (
        <div>
            {name}
        </div>
    )
}

export default Persons;