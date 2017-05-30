import {
	CURRENT_LOCATION_FETCH_SUCCESS,
	BOOKMARK_LOCATION_FETCH_SUCCESS
} from '../actions/types';
import { WeatherIcon } from '../Utils/WeatherIcon';

const INITIAL_STATE = {
	weatherId: '',
	temperature: '',
	date: '',
	humidity: '',
	currentCity: '',
	rainChance: '',
	wind: '',
	weatherIcon: '',
	latitude: null,
	longitude: null,
	error: null,
	showModal: false,
	cityToBeAdded: '',
	currentLocationDisabled: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CURRENT_LOCATION_FETCH_SUCCESS: {
			// example of a payload: action.payload === { prop: 'name', value: 'jane' }
			// The code below is called key interpolation, for example; if action.payload.prop is 'name' then "[action.payload.prop]: action.payload.value" will be interpreted as { name: value }
			const weatherData = action.payload;
			
			return { 
				...state, 
				weatherId: weatherData.weather[0].id,
				weatherCondition: weatherData.weather[0].main,
				currentCity: weatherData.name,
				temperature: weatherData.main.temp,
				date: weatherData.dt,
				humidity: weatherData.main.humidity,
				wind: weatherData.wind.speed,
				weatherIcon: `https://openweathermap.org/img/w/${WeatherIcon(weatherData.weather[0].id)}.png`,
				currentLocationDisabled: false
			};	
		}
		case BOOKMARK_LOCATION_FETCH_SUCCESS: {
			const weatherData = action.payload;

			return { 
				...state, 
				weatherId: weatherData.weather[0].id,
				weatherCondition: weatherData.weather[0].main,
				currentCity: weatherData.name,
				temperature: weatherData.main.temp,
				date: weatherData.dt,
				humidity: weatherData.main.humidity,
				wind: weatherData.wind.speed,
				weatherIcon: `https://openweathermap.org/img/w/${WeatherIcon(weatherData.weather[0].id)}.png`,
				currentLocationDisabled: true
			};
		}
		default:
			return state;
	}
};
