import React, { useState } from 'react'

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
const Numbers = ({ persons, filter }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <p>{person.name} {person.number}</p>
            )}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Joni Kopra', number: '040-1570595' },
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const addPerson = (e) => {
        e.preventDefault()
        const newPerson = {name: newName, number: newNumber}

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}  />
            <h2>Numbers</h2>
            <Numbers persons={persons} filter={filter} />
        </div>
    )
}

export default App