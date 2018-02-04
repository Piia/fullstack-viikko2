import React from 'react'

const Book = ({persons, filter, deletionHandler}) => {
	const filtered = persons.filter((person) =>
  			person.name.toLowerCase().includes(filter.toLowerCase())
  		)
	const lines = filtered.map((person => 
		<tr key={person.id}>
			<td>{person.name}</td>
			<td>{person.number}</td>
			<td><button onClick={deletionHandler} id={person.id}>poista</button></td>
		</tr>
	))
	return (
		<table>
		<tbody>
			{lines}
		</tbody>
		</table>
	)
}

export default Book