import React, { Component } from 'react';
import CardList from "./CardList";
import SearchBox from './SearchBox';
import {weather} from "./weather";
import Scroll from './scroll.js';


class App extends Component {
    constructor () {
        super();
        this.state = {
            myweatherinfo: weather, 
            searchValue: ''

        }
    }
    
    componentDidMount() {
        fetch('https://api.data.gov.sg/v1/environment/air-temperature').then(response => { return response.json()})
        .then(weather => {
            const updatedWeather = [];
            for (let i = 0; i < weather.metadata.stations.length; i++) {
                updatedWeather.push({ ...weather.metadata.stations[i], ...weather.items[0].readings[i] })
            }
            this.setState({ myweatherinfo: updatedWeather })

        })
    }

    onSearchChange = (e) => {
        console.log(e.target.value)
        this.setState({ searchValue: e.target.value})
    }
    
    render(){ 
        let filteredWeather = this.state.myweatherinfo.filter(eachWeatherInfo => eachWeatherInfo.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
        return (
            <div className="tc">
                <h1>Weather App</h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <Scroll>
                <CardList weatherinfo ={filteredWeather} />
                </Scroll>
            </div>
        )
    }
}


export default App;