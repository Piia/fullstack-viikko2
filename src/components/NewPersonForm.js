import React from 'react'

const NewPersonForm = ({addPerson, nameHandler, numberHandler, newName, newNumber}) => {
	return (
		<form onSubmit={addPerson}>
          <div>
            Nimi: <input
            value={newName}
            onChange={nameHandler}/>
          </div>
          <div>
            Numero: <input
            value={newNumber}
            onChange={numberHandler}/>
          </div>
          <div>
            <button type="submit">
            	lisää
            </button>
          </div>
        </form>
    )
}

export default NewPersonForm