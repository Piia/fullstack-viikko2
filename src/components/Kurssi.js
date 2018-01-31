import React from 'react'

const Otsikko = ({teksti}) => 
	<h1>{teksti}</h1>

const Osa = ({osa}) => 
	<p>{osa.nimi} {osa.tehtavia}</p>

const Sisalto = ({osat}) => osat.map(osa =>
	<Osa key={osa.id} osa={osa} />
)

const Yhteensa = ({osat}) => {
	const tehtavia = osat.map((osa) => osa.tehtavia)
	const reducer = (accumulator, currentValue) => accumulator + currentValue
	const maara = tehtavia.reduce(reducer)
	//console.log(maara)
	
	return (
		<p>Yhteensä {maara} tehtävää</p>
	)
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
        	<Otsikko teksti={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi