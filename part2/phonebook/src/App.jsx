import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 'Arto Hellas', name: 'Arto Hellas', newPhone: '040-1234567' },
    { name: 'Ada Lovelace', newPhone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', newPhone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', newPhone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState([]);
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const contacts = {
      id: newName,
      name: newName,
      newPhone,
    }
    
    const exists = persons.some(person => person.name === contacts.name)
    if (!exists) {
      setPersons(persons.concat(contacts))
    } else {
      alert(`${contacts.name} is already added to phonebook`);
    }

    setNewName('')
    setNewPhone('')
  }

  const handleChangeNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNewPhone = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilter = (event) => {
    if (event.target.value === '') {
      setSearchName([])
    } else {
      setSearchName(persons.filter((p) => p.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeNewName={handleChangeNewName}
        newPhone={newPhone}
        handleChangeNewPhone={handleChangeNewPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={searchName.length > 0 ? searchName : persons} />
    </div>
  )
}

export default App