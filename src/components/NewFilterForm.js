import React from 'react'

const NewFilterForm = ({filter, filterHandler}) => {
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

export default NewFilterForm