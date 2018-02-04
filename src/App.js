// Materiaalista
import React from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          notes: [],
          newNote: '',
          showAll: true
      }
      console.log('constructor')
    }

    componentDidMount() {
      noteService
        .getAll()
        .then(response => {
          this.setState({notes: response.data})
        })
    }

    addNote = (event) => {
      // ...
      noteService
        .create(noteObject)
        .then(response => {
          this.setState({
            notes: this.state.notes.concat(response.data),
            newNote: ''
          })
        })
    }

    toggleImportanceOf = (id) => {
      return () => {
        const note = this.state.notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
          .update(id, changedNote)
          .then(changedNote => {
            const notes = this.state.notes.filter(n => n.id !== id)
            this.setState({
              notes: notes.concat(changedNote)
            })
          })
          .catch(error => {
            alert(`muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`)
            this.setState({ notes: this.state.notes.filter(n => n.id !== id) })
          })
      }
    }

    handleNoteChange = (event) => {
      //console.log(event.target.value)
      this.setState({ newNote: event.target.value })
    }

    toggleVisible = () => {
      this.setState({showAll: !this.state.showAll})
    }

    render() {
      console.log('render')
      const notesToShow =
          this.state.showAll ?
            this.state.notes :
            this.state.notes.filter(note => note.important === true)

      const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

      return (
        <div>
          <h1>Muistiinpanot</h1>

          <div>
            <button onClick={this.toggleVisible}>
              näytä {label}
            </button>
          </div>

          <ul>
            {notesToShow.map(note => <Note 
                                        key={note.id} 
                                        note={note} 
                                        toggleImportance={this.toggleImportanceOf(note.id)} />)}
          </ul>
          <form onSubmit={this.addNote}>
            <input
              value={this.state.newNote}
              onChange={this.handleNoteChange}
            />
            <button type="submit">tallenna</button>
          </form>
        </div>
      )
    }
}

export default App


/*
// Tehtäviä... Puhelinluettelosta
import React from 'react'
import axios from 'axios'

const Header = ({text}) => <h2>{text}</h2>

const Book = ({persons, filter}) => {
	const filtered = persons.filter((person) =>
  			person.name.toLowerCase().includes(filter.toLowerCase())
  		)
	const lines = filtered.map((person => 
		<tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>
	))
	return (
		<table>
		<tbody>
			{lines}
		</tbody>
		</table>
	)
}

const NewForm = ({addPerson, nameHandler, numberHandler, newName, newNumber}) => {
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

const FilterForm = ({filter, filterHandler}) => {
	return (
		<form>
		<div>
            Rajaa: 
            <input
            	value={filter}
            	onChange={filterHandler}/>
          </div>  
        </form>      
    )
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  	persons: [],
		    newName: '',
		    newNumber: '',
		    filter: ''
		}
	}

	componentDidMount() {
    	console.log('will mount')
    	axios
      		.get('http://localhost:3002/persons')
      		.then(response => {
        		console.log('promise fulfilled')
        		this.setState({ persons: response.data })
      		})
  	}

	addPerson = (event) => {
		event.preventDefault()
		const names = this.state.persons.map((p) => p.name)
		if (names.includes(this.state.newName)) {
			alert("Nimi on jo luettelossa!")
			return
		}
		const person = {
		    name: this.state.newName,
		    id: this.state.persons.length + 1,
		    number: this.state.newNumber
	  	}

		const persons = this.state.persons.concat(person)

		this.setState({
			persons,
			newName: '',
			newNumber: ''
		})
	}

  	handleNameChange = (event) => this.setState({ newName: event.target.value })
  	handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  	
  	handleFilterChange = (event) => {
  		this.setState({ filter: event.target.value })
  		//jtn
  	}

  	generateLines = () => {
  		const filtered = this.state.persons.filter((person) =>
  			person.name.toLowerCase().includes(this.state.filter.toLowerCase())
  		)
  		const lines = filtered.map((person => 
  			<p key={person.id}>{person.name} {person.number}</p>
  		))
  		return lines
  	}
  

  	render() {

    return (
      <div>
        
      	<Header 
      		text="Puhelinluettelo" />
        <FilterForm 
        	filter={this.state.filter} 
        	filterHandler={this.handleFilterChange} />
        <Header 
        	text="Lisää uusi" />
        <NewForm 
        	addPerson={this.addPerson} 
        	nameHandler={this.handleNameChange} 
        	numberHandler={this.handleNumberChange} 
        	newName={this.state.newName} 
        	newNumber={this.state.newNumber} />
        
        <Header 
        	text="Numerot" />
       	<Book 
       		persons={this.state.persons} 
       		filter={this.state.filter} />
      </div>
    )
  }
}

export default App
*/

/*
// Materiaalista
import React from 'react'
import Note from './components/Note'
import axios from 'axios'

class App extends React.Component {
  	constructor(props) {
    	super(props)
    	this.state = {
      		notes: [],
      		newNote: '',
      		showAll: true
    	}
    	console.log('constructor')
  	}

  	componentDidMount() {
    	console.log('will mount')
    	axios
      		.get('http://localhost:3002/notes')
      		.then(response => {
        		console.log('promise fulfilled')
        		this.setState({ notes: response.data })
      		})
  	}

  	addNote = (event) => {
	    event.preventDefault()
	    //console.log('nappia painettu')
	    const noteObject = {
		    content: this.state.newNote,
		    date: new Date().new,
		    important: Math.random() > 0.5,
		    id: this.state.notes.length + 1
		}

	  	const notes = this.state.notes.concat(noteObject)

	  	this.setState({
		    notes,
		    newNote: ''
	  	})
  	}

  	handleNoteChange = (event) => {
    	//console.log(event.target.value)
    	this.setState({ newNote: event.target.value })
  	}
  	toggleVisible = () => {
    	this.setState({showAll: !this.state.showAll})
  	}

  	render() {
  		console.log('render')
    	const notesToShow =
      		this.state.showAll ?
        		this.state.notes :
        		this.state.notes.filter(note => note.important === true)

    	const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    	return (
	      <div>
	        <h1>Muistiinpanot</h1>

	        <div>
	          <button onClick={this.toggleVisible}>
	            näytä {label}
	          </button>
	        </div>

	        <ul>
	          {notesToShow.map(note => <Note key={note.id} note={note} />)}
	        </ul>
	        <form onSubmit={this.addNote}>
	          <input
	            value={this.state.newNote}
	            onChange={this.handleNoteChange}
	          />
	          <button type="submit">tallenna</button>
	        </form>
	      </div>
    	)
  	}
}

export default App
*/

/*
// Tehtävät 2.6.-2.11:
const Header = ({text}) => <h2>{text}</h2>

const Book = ({persons, filter}) => {
	const filtered = persons.filter((person) =>
  			person.name.toLowerCase().includes(filter.toLowerCase())
  		)
	const lines = filtered.map((person => 
		<tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>
	))
	return (
		<table>
		<tbody>
			{lines}
		</tbody>
		</table>
	)
}

const NewForm = ({addPerson, nameHandler, numberHandler, newName, newNumber}) => {
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

const FilterForm = ({filter, filterHandler}) => {
	return (
		<form>
		<div>
            Rajaa: 
            <input
            	value={filter}
            	onChange={filterHandler}/>
          </div>  
        </form>      
    )
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  	persons: [
		      { id: 0, name: 'Arto Hellas', number: '040-123456' },
		      { id: 1, name: 'Martti Tienari', number: '040-123456' },
		      { id: 2, name: 'Arto Järvinen', number: '040-123456' },
		      { id: 3, name: 'Lea Kutvonen', number: '040-123456' }
		    ],
		    newName: '',
		    newNumber: '',
		    filter: ''
		}
	}

	addPerson = (event) => {
		event.preventDefault()
		const names = this.state.persons.map((p) => p.name)
		if (names.includes(this.state.newName)) {
			alert("Nimi on jo luettelossa!")
			return
		}
		const person = {
		    name: this.state.newName,
		    id: this.state.persons.length + 1,
		    number: this.state.newNumber
	  	}

		const persons = this.state.persons.concat(person)

		this.setState({
			persons,
			newName: '',
			newNumber: ''
		})
	}

  	handleNameChange = (event) => this.setState({ newName: event.target.value })
  	handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  	
  	handleFilterChange = (event) => {
  		this.setState({ filter: event.target.value })
  		//jtn
  	}

  	generateLines = () => {
  		const filtered = this.state.persons.filter((person) =>
  			person.name.toLowerCase().includes(this.state.filter.toLowerCase())
  		)
  		const lines = filtered.map((person => 
  			<p key={person.id}>{person.name} {person.number}</p>
  		))
  		return lines
  	}
  

  	render() {

    return (
      <div>
        
      	<Header 
      		text="Puhelinluettelo" />
        <FilterForm 
        	filter={this.state.filter} 
        	filterHandler={this.handleFilterChange} />
        <Header 
        	text="Lisää uusi" />
        <NewForm 
        	addPerson={this.addPerson} 
        	nameHandler={this.handleNameChange} 
        	numberHandler={this.handleNumberChange} 
        	newName={this.state.newName} 
        	newNumber={this.state.newNumber} />
        
        <Header 
        	text="Numerot" />
       	<Book 
       		persons={this.state.persons} 
       		filter={this.state.filter} />
      </div>
    )
  }
}

export default App
*/

/*
// Materiaalista
import React from 'react'
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes,
      newNote: 'uusi muistiinpano...',
      showAll: true
    }
  }

  addNote = (event) => {
    event.preventDefault()
    //console.log('nappia painettu')
    const noteObject = {
	    content: this.state.newNote,
	    date: new Date().new,
	    important: Math.random() > 0.5,
	    id: this.state.notes.length + 1
	  }

	  const notes = this.state.notes.concat(noteObject)

	  this.setState({
	    notes,
	    newNote: ''
	  })
  }

  handleNoteChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }
  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }

  render() {
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Muistiinpanot</h1>

        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>

        <ul>
          {notesToShow.map(note => <Note key={note.id} note={note} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
}

export default App
*/