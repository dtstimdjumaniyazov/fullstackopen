import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { getAll, create, update, del } from './services/phoneBook'

const App = () => {
  const [personInfo, setPersonInfo] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState([]);
  

  useEffect(() => {
    getAll().then(initialValues => {
      setPersonInfo(initialValues)
    })
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const contacts = {
      name: newName,
      newPhone: newPhone,
    }
    
    const nameExists = personInfo.some(person => person.name === contacts.name)
    console.log('nameExists', nameExists)
    const person = personInfo.find(p => p.name === contacts.name)
    // console.log(person)
    

    if (!nameExists) {
      create(contacts)
        .then(returnedObject => {
          setPersonInfo(personInfo.concat(returnedObject))
        })
    } else if (nameExists) {
        const windowsForCondition = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
        if (windowsForCondition) {
          const updatedPersonInfo = { ...person,  newPhone: newPhone}
          
          update(person.id, updatedPersonInfo)
            .then(returnedObject => {
              setPersonInfo(personInfo.map(p => p.id === person.id ? returnedObject : p))
            })
        }
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
      setSearchName(personInfo.filter((p) => p.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    }
  }

  const handleDelete = (id, name) => {
      if (window.confirm(`Delete ${name}`)) {
        del(id).then(
          setPersonInfo(personInfo.filter(p => p.id !== id))
        )
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
      <Persons personInfo={searchName.length > 0 ? searchName : personInfo} handleDelete={handleDelete}/>
    </div>
  )
}

export default App