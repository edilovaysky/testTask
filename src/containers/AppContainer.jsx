import 'assets/global.scss';

import React, { Component } from 'react';

import Autocomplete from 'react-google-autocomplete';

import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactDadata } from 'react-dadata';
import { connect } from 'react-redux';
import { loadLocalWeather } from 'actions/fetchLocalWeather';
import { storeChosenCity } from 'actions/choseCity';

import { MainMenu } from 'components/MainMenu';
import { Hint } from 'components/Hint';
import { LocalWeather } from 'components/LocalWeather';

class App extends Component {
  state = {
    dispHint: false,
    city: '',
  };
  componentDidMount() {
    let lat, long;

    const { fetchLocalWeather } = this.props;

    window.navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      let latitude = lat.toString();
      let longitude = long.toString();
      let city = `${latitude},${longitude}`;
      const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=a7ef39d9de904cc796c22218192311&q=${city}&cc=yes&format=json`;

      const urlLocal = `http://api.worldweatheronline.com/premium/v1/search.ashx?key=a7ef39d9de904cc796c22218192311&q=${city}&&format=json&`;
      fetch(urlLocal, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          let foundCity = data.search_api.result[0].region[0].value;
          fetchLocalWeather(url, foundCity);
        });
    });
  }
  handleCitySearch = (name, value) => {
    this.setState({ [name]: value });
  };
  handleCityChange = input => {
    console.log(input.data.city);
    this.setState({ dispHint: true, city: input.data.city });
    const { fetchLocalWeather } = this.props;
    let foundCity = input.data.city;
    ymaps.geocode(foundCity, { results: 1 }).then(res => {
      const firstObj = res.geoObjects.get(0);
      const coords = firstObj.geometry.getCoordinates();
      console.log(coords.toString());
      const city = coords.toString();
      const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=a7ef39d9de904cc796c22218192311&q=${city}&cc=yes&format=json`;
      fetchLocalWeather(url, foundCity);
    });
  };
  handleClose = () => {
    this.setState({ dispHint: false });
  };
  handleStore = () => {
    this.setState({ dispHint: false });
    const { choseCity } = this.props;
    const { city } = this.state;
    choseCity(city);
  };
  render() {
    const { dispHint, city } = this.state;
    console.log(this.props.chosenCity);
    const API_KEY = 'be6f43ce4ca8e5e3a302f9699bc14318e6fb5482';

    return (
      <section className="app-wrapper">
        <div className="navbar">
          <MainMenu />
        </div>
        {dispHint && (
          <Hint onStore={this.handleStore} onClose={this.handleClose} />
        )}
        <ReactDadata
          token={API_KEY}
          query="Москва"
          placeholder="выберите город"
          onChange={this.handleCityChange}
        />

        <section className="local-weather-wrapper">
          <LocalWeather />
        </section>

        <Switch>
          <Route path="/someroute" render={() => <Btn />} exact />
        </Switch>
      </section>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    localWeatherData: state.fetchLocalWeather.entries,
    chosenCity: state.choseCity.entries,
  };
}
function mapDispatchToProps(dispatch, props) {
  return {
    fetchLocalWeather: (url, foundCity) =>
      dispatch(loadLocalWeather(url, foundCity)),
    choseCity: city => dispatch(storeChosenCity(city)),
  };
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
