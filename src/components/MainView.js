import React, { Component } from 'react';
import { Image, Text, ListView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input, Add } from './common';
import { bookmarkAdd, currentLocationFetch, unitsChange } from '../actions';
import ForecastListView from './ForecastListView';
import Chart from './Chart';

const baseURL = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '9532d6af0385dd5f5c82a63d80413570';

class MainView extends Component {
	state ={ 
		showModal: false,
		bookmarkToBeAdded: ''
	}

	componentWillMount() {
		//console.log('Current Loc Disabled?: ' + this.props.currentLocationDisabled);
		if (!this.props.currentLocationDisabled) {
			this.props.currentLocationFetch(baseURL, 'weather', this.props.units, API_KEY);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.units !== nextProps.units) {
			this.props.currentLocationFetch(baseURL, 'weather', nextProps.units, API_KEY);
		}
	}

	onAdd() {
		this.setState({ 
			showModal: false 
		});		

		const { bookmarkToBeAdded } = this.state;
		this.props.bookmarkAdd(bookmarkToBeAdded);
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	render() {
		const { 
			thumbnailStyle,
			customCardSectionStyle
		} = styles;

		return (
			<Card style={{paddingBottom: 50}}>
				<ScrollView>
					<CardSection style={{ justifyContent: 'center' }}>
						<Text style={{ fontSize: 32, fontWeight: 'bold' }} > {this.props.currentCity} </Text>
					</CardSection>

					<CardSection style={customCardSectionStyle}>
						<Image 
							style={thumbnailStyle}
							source={{ uri: this.props.weatherIcon }} 
						/>
						<Text style={{ fontSize: 27 }}>{this.props.temperature}{this.props.units === 'metric' ? '°C' : '°F'}</Text>
						<Text> { this.props.weatherCondition} </Text>
					</CardSection>

					<CardSection style={customCardSectionStyle}>
						<Text>Humidity: %{this.props.humidity}</Text>
						<Text>Wind Speed: {this.props.wind} m/s</Text>
						{this.props.error ? <Text>Error: {this.props.error}</Text> : null}
					</CardSection>

					{/*<CardSection style={{ borderBottomWidth: 0 }}>
						<Button onPress={() => Actions.BookmarkList()}>
							Bookmarks
						</Button>
					</CardSection>*/}

					<CardSection>
						<Button onPress={() => this.setState({ showModal: !this.props.showModal })}>
							Add bookmark
						</Button>
					</CardSection>

					<CardSection>
						<ForecastListView 
							currentCity={this.props.currentCity}
						/>
					</CardSection>

					<CardSection>
						<Chart 
							forecastItems={this.props.forecastItems}
						/>
					</CardSection>

					<Add 
						visible={this.state.showModal}
						onAdd={this.onAdd.bind(this)}
						onDecline={this.onDecline.bind(this)}
					>
						<Input 
							label={'Add City'}
							onChangeText={bookmarkToBeAdded => {
								this.state.bookmarkToBeAdded = bookmarkToBeAdded;
							}}
						/>
					</Add>
				</ScrollView>
			</Card>
		);
	}
}

const styles = {
	thumbnailStyle: {
		width: 40,
		height: 40
	},
	customCardSectionStyle: {
		alignItems: 'center', 
		flexDirection: 'column'
	}
};

const mapStateToProps = (state) => {
	const { bookmarkCityName } = state.bookmarkDetail;

	const { 
		weatherId, 
		weatherCondition, 
		currentCity, 
		temperature, 
		date, 
		humidity, 
		wind, 
		weatherIcon,
		currentLocationDisabled
	} = state.currentLocation;
	
	const { units } = state.settings;

	const { forecastItems } = state.forecast;

	return { 
		bookmarkCityName,
		weatherId, 
		weatherCondition, 
		currentCity, 
		temperature, 
		date, 
		humidity, 
		wind, 
		weatherIcon,
		currentLocationDisabled,
		units,
		forecastItems
	};
};

export default connect(mapStateToProps, { bookmarkAdd, currentLocationFetch, unitsChange })(MainView);
