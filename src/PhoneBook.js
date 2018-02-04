import React from 'react'
import axios from 'axios'
import personService from './services/persons'
import Book from './components/Book'
import NewPersonForm from './components/NewPersonForm'
import NewFilterForm from './components/NewFilterForm'


const Header = ({text}) => <h2>{text}</h2>

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

class PhoneBook extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  	persons: [],
		    newName: '',
		    newNumber: '',
		    filter: '',
        message: null
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
    let persons = this.state.persons
    let person = persons.find(p => p.name === this.state.newName)
    console.log(person)
		if((person !== undefined) && (window.confirm(`Haluatko korvata henkilön ${person.name} olemassaolevan numeron?`))) {
      person.number = this.state.newNumber
      personService.update(person.id, person)
        .then(response => {
          this.setState({
            persons,
            newName: '',
            newNumber: ''
          })
          this.setState({message: `Henkilön ${person.name} numeron päivittäminen onnistui!`})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
        })
        .catch(error => {
            this.setState({message: "ERROR in number update"})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
            personService
              .create(person)
              .then(response => {
                console.log(response)
                person.id = response.id
                persons = this.state.persons.concat(person)
                this.setState({
                  persons,
                  newName: '',
                  newNumber: ''
                })
                this.setState({message: `Henkilön ${person.name} lisääminen onnistui!`})
                  setTimeout(() => {
                    this.setState({message: null})
                  }, 5000)
              })
              .catch(error => {
                  this.setState({message: "ERROR in add"})
                  setTimeout(() => {
                    this.setState({message: null})
                  }, 5000)
                })
          })
    } else {
      person = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      personService
        .create(person)
        .then(response => {
          console.log(response)
          person.id = response.id
          persons = this.state.persons.concat(person)
          this.setState({
            persons,
            newName: '',
            newNumber: ''
          })
          this.setState({message: `Henkilön ${person.name} lisääminen onnistui!`})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
        })
        .catch(error => {
            this.setState({message: "ERROR in add"})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })

    }
	}

  	handleNameChange = (event) => this.setState({ newName: event.target.value })
  	handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  	handleFilterChange = (event) => this.setState({ filter: event.target.value })
    handleDeletion = (event) => {
      if(window.confirm("Haluatko varmasti poistaa yhteystiedon?")) {
        const id = parseInt(event.target.id, 10)
        const person = this.state.persons.find(p => p.id === id)
        personService
          .destroy(id)
          .then(response => {
            const persons = this.state.persons.filter(p => p.id !== id)
            this.setState({persons})
            this.setState({message: `Henkilön ${person.name} poistaminen onnistui!`})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
          .catch(error => {
            this.setState({message: "ERROR in destroy"})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
      }
    }

  	render() {

    return (
      <div>
        
      	<Header 
      		text="Puhelinluettelo" />
        <Notification message={this.state.message}/>
        <NewFilterForm 
        	filter={this.state.filter} 
        	filterHandler={this.handleFilterChange} />
        <Header 
        	text="Lisää uusi" />
        <NewPersonForm 
        	addPerson={this.addPerson} 
        	nameHandler={this.handleNameChange} 
        	numberHandler={this.handleNumberChange} 
        	newName={this.state.newName} 
        	newNumber={this.state.newNumber} />
        
        <Header 
        	text="Numerot" />
       	<Book 
       		persons={this.state.persons} 
       		filter={this.state.filter} 
          deletionHandler={this.handleDeletion} />
      </div>
    )
  }
}

export default PhoneBook