import _ from 'lodash';
import { FORECAST_FETCH_SUCCESS } from '../actions/types';
import { WeatherIcon } from '../Utils/WeatherIcon';

const INITIAL_STATE = {
	forecastItems: []
/*	temperatures: [],
	weatherIcons: []*/
};

export default(state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FORECAST_FETCH_SUCCESS: {
			const forecastData = action.payload;
			return {
				...state,
				// temperatures: _.map(forecastData.list, (temp) => {
				// 	return temp.day;
				// }),
				// weatherIcons: _.map(forecastData.list, (weather) => {
				// 	return `https://openweathermap.org/img/w/${WeatherIcon(weather.id)}.png`;
				// }),
				forecastItems: _.map(forecastData.list, (forecastItem) => {
					return { 
						temperature: forecastItem.temp.day,
						weatherIcon: `https://openweathermap.org/img/w/${WeatherIcon(forecastItem.weather[0].id)}.png`,
						dt: forecastItem.dt
					};
				})
			};
		}
		default:
			return state;
	}
};
