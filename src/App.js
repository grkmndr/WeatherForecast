import React, { Component } from 'react';
import { View, Text, BackAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyCVmZG1E94cUYEHQFMYRvGTXspUMxGy3zc',
			authDomain: 'weatherforecast-5ddbd.firebaseapp.com',
			databaseURL: 'https://weatherforecast-5ddbd.firebaseio.com',
			projectId: 'weatherforecast-5ddbd',
			storageBucket: 'weatherforecast-5ddbd.appspot.com',
			messagingSenderId: '1016354950808'
			};

		firebase.initializeApp(config);
	}

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	handleBackButton() {
		return true;
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
