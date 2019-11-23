import './LocalWeather.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class LocalWeatherInit extends Component {
  render() {
    const { localWeatherData } = this.props;

    let data, city;
    if (localWeatherData) {
      data = localWeatherData.data;
      city = localWeatherData.foundCity;
    }
    let imgUrl, temp, feel;
    if (data) {
      imgUrl = data.weatherIconUrl[0].value;
      temp = data.temp_C;
      feel = data.FeelsLikeC;
    }

    return (
      <div className="plate-wrapper">
        <p>В городе {city} погодка выглядит примерно так:</p>

        <img src={imgUrl} alt="weather" />
        <p>
          Температура за окно {temp} градусов цельсия, но ощущается как {feel}.
        </p>
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    localWeatherData: state.fetchLocalWeather.entries,
  };
}

export const LocalWeather = connect(mapStateToProps)(LocalWeatherInit);
