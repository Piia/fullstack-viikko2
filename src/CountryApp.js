import React from 'react'
import axios from 'axios'
import Country from './components/Country'

const Header = ({text}) => <h2>{text}</h2>

const Content = ({countries, filter}) => {
	const filtered = countries.filter((country) =>
  			country.name.toLowerCase().includes(filter.toLowerCase())
  		)
  const content = filtered.length <= 10 ?
    filtered.map((country => <Country 
                                key={country.name} 
                                country={country} 
                                full={filtered.length === 1} />)) 
    : <p>Too many matches!</p>
	return (
		<div>
			{content}
		</div>
	)
}

const Finder = ({filter, filterHandler}) => {
	return (
		<form>
		<div>
            Find: 
            <input
            	value={filter}
            	onChange={filterHandler}/>
          </div>  
        </form>      
    )
}

class CountryApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  	countries: [],
		    filter: ''
		}
	}

	componentDidMount() {
    	console.log('will mount')
    	axios
      		.get('https://restcountries.eu/rest/v2/all')
      		.then(response => {
        		console.log('promise fulfilled')
        		this.setState({ countries: response.data })
      		})
  	}
  	
  	handleFilterChange = (event) => this.setState({ filter: event.target.value })


  	render() {

      return (
        <div>
          
        	<Header 
        		text="Country Application" />
          <Finder 
          	filter={this.state.filter} 
          	filterHandler={this.handleFilterChange} />
         	<Content 
         		countries={this.state.countries} 
         		filter={this.state.filter} />
        </div>
      )
  }
}

export default CountryApp