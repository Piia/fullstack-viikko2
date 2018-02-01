import React from 'react'

class Country extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        full: this.props.full
    }
  }

  handleClick = () => this.setState({full: true })

  show = () => {
    return this.state.full ? 
      (
        <div>
          <h2>{this.props.country.name}</h2>
          <p>Capital: {this.props.country.capital}</p> 
          <p>Population: {this.props.country.population}</p>
          <p><img src={this.props.country.flag} alt="flag" width="200" /></p>  
        </div>
      ) : (
        <div onClick={this.handleClick}>
          {this.props.country.name}
        </div>
      )
  }

  render() {

    return(
      <div>
        {this.show()}
      </div>
      )
  }
}

export default Country