import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

const Filter = ({ filter, onChange }) => {
    return (
        <div>
            filter shown with: <input value={filter} onChange={onChange} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
            name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

//That filter isn't pretty, but It's very functional! -JK
const Numbers = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <p key={person.id}>{person.name} {person.number} <DeleteButton person={person} handleDelete={handleDelete}/></p>
            )}
        </div>
    )
}

const DeleteButton = ({ person, handleDelete }) => {
    return (
        <button onClick={() => handleDelete(person)} >delete</button>
    )
}

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ messageType, setMessageType ] = useState('notif')

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    
    const handleDelete = (person) => {
        const result = window.confirm(`Delete ${person.name}?`)
        
        if (result) {
            personService
                .remove(person.id)
                .then(response => {
                    const newPeopleList = persons.filter(p => p.name !== person.name)
                    setPersons(newPeopleList)
                    setErrorMessage()
                })
                .catch(error => {
                    setErrorMessage(`${person.name} was already removed from the server`)
                    setMessageType('error')
                    setTimeout(() => setErrorMessage(null), 3000)
                })
        }
    }

    const addPerson = (e) => {
        e.preventDefault()
        const newPerson = {name: newName, number: newNumber}

        if (persons.find(person => person.name === newName)) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                const person = persons.find(p => p.name === newName)
                personService
                    .update(person.id, newPerson)
                    .then(response => {
                        setPersons(persons.concat(response.data))
                        setNewName('')
                        setNewNumber('')
                        setErrorMessage(`Updated ${newPerson.name}`)
                        setMessageType('notif')
                        setTimeout(() => setErrorMessage(null), 3000)
                    })
            }
        } else {

            personService
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setErrorMessage(`Added ${newPerson.name}`)
                    setMessageType('notif')
                    setTimeout(() => setErrorMessage(null), 3000)
                })
        }
    }

    
    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} type={messageType} />
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Numbers persons={persons} filter={filter} handleDelete={handleDelete} />
        </div>
    )
}

export default App