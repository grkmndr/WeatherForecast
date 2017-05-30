import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import firebase from 'firebase';
import axios from 'axios';

import {
	CURRENT_LOCATION_FETCH_SUCCESS,
	BOOKMARK_LOCATION_FETCH_SUCCESS,
	FORECAST_FETCH_SUCCESS
} from './types';

export const currentLocationFetch = (baseURL, type, units, API_KEY) => {
	return (dispatch) => {
		console.log('TYPE: ' + type);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const requestURL = `${baseURL}${type}?units=${units}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`;
				//this.prepareURL(baseURL, position.coords.latitude, position.coords.longitude, 'weather');

				axios.get(requestURL)
					.then((response) => {
						dispatch({ type: CURRENT_LOCATION_FETCH_SUCCESS, payload: response.data });
						//self.parseResponse(response.data);
						//console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			},
			(error) => dispatch({ type: 'error', error: error.message }),
				{ 
					enableHighAccuracy: false, 
					timeout: 20000, 
					maximumAge: 1000 
				},
		);
	};
};

export const bookmarkLocationFetch = (baseURL, type, units, API_KEY, cityName) => {
	return (dispatch) => {
		const requestURL = `${baseURL}${type}?units=${units}&q=${cityName}&appid=${API_KEY}`;

		console.log(requestURL);
		axios.get(requestURL)
			.then((response) => {
				dispatch({ type: BOOKMARK_LOCATION_FETCH_SUCCESS, payload: response.data });
				Actions.forecast();

				//self.parseResponse(response.data);
				//console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const forecastFetch = (baseURL, type, units, API_KEY, cityName) => {
	return (dispatch) => {
		const requestURL = `${baseURL}${type}/daily?units=${units}&q=${cityName}&appid=${API_KEY}`;

		console.log(requestURL);
		axios.get(requestURL)
			.then((response) => {
				dispatch({ type: FORECAST_FETCH_SUCCESS, payload: response.data });				

				//self.parseResponse(response.data);
				//console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
