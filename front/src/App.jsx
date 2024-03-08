import './App.css'

import { useState, useEffect } from 'react'
import { create, deletePerson, getAll, update } from './services/persons'



function App() {

  const [persons, setPersons] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const entries = Object.fromEntries(new FormData(e.target));
    cleanStr(entries)
    checkPersonAndUpdate(entries)
  }

  const cleanStr = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    });
  };

  const checkPersonAndUpdate = async (obj) => {
    try {
      const findPerson = persons.find(person => person.name === obj.name);
      let result;

      if (findPerson) {
        result = await update(findPerson.id, obj);
      } else {
        result = await create(obj);
      }
      const filteredPersons = persons.filter(p => p.id !== result.id)
      setPersons([...filteredPersons, result]);
    } catch (error) {
      console.error("Error en la operación: ", error.response ? error.response.data : error);
    }
  };


  const deleteItem = async (id) => {
    const response = await deletePerson(id)
    console.log(response)
    const users = persons.filter(user => user.id !== id)
    setPersons(users)
  }

  useEffect(() => {
    getAll()
      .then(setPersons)
  }, [setPersons])

  const styleColor = {
    color: 'red',
    backgroundColor: 'gray',
    borderRaidus: 10
  }
  const styleColorAdded = {
    color: 'green',
    backgroundColor: 'purple',
    fontZise: 'bold',
  }

  return (
    <>
      <h1>Phonebook</h1>
      <h2 style={styleColor}>{ }</h2>
      <h2 style={styleColorAdded}>{ }</h2>
      <h2>Add new</h2>

      <br />
      <br />
      <form onSubmit={handleSubmit} >

        name:
        <input title={'name:'} name='name' />
        <br />
        <br />
        number:
        <input title={'number: '} name='number' />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br />
      <ul>
        {persons.map((person, i) => {
          return (
            <li key={person.id || i} id={person.id}>
              <p>{person.name} - {person.number}</p>
              <button onClick={() => deleteItem(person.id)}>delete</button>
            </li>

          )
        })}

      </ul>


    </>
  )
}

export default App
