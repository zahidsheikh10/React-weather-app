import React from 'react';
import './css/App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "813bdf13a1af3e0872f90a8189f73b13";

class App extends React.Component {
	state = {
		temperature:undefined,
		city:undefined,
		country:undefined,
		humidity:undefined,
		description:undefined,
	}
	getWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		const data = await api_call.json();
		console.log(data);
		this.setState({
			temperature:data.main.temp,
			city:data.name,
			country:data.sys.country,
			humidity:data.main.humidity,
			description:data.weather[0].description,
		})	
	}
    render(){
        return(
        	<div className="wrapper">
        		<div className="main">
			            <Titles/>
			        <div className="form-container">
			            <Form getWeather={this.getWeather}/>
			            <Weather {...this.state}/>
			        </div>
		        </div>
	        </div>
        )
    }
}

export default App;
