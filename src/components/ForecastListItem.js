import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { unitsChange } from '../actions';

class ForecastListItem extends Component {
	render() {		
		const { containerStyle, iconStyle } = styles;
		const timestamp = this.props.forecastItem.dt;
		const a = new Date(timestamp * 1000);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const dayOfWeek = days[a.getDay()];
		return (
			<CardSection 
				style={containerStyle}
			>
				<Image
					source={{ uri: this.props.forecastItem.weatherIcon }}
					style={iconStyle}
				/>
				<Text>{ this.props.forecastItem.temperature }{this.props.units === 'metric' ? '°C' : '°F'}</Text>
				<Text>{ dayOfWeek }</Text>
			</CardSection>
		);
	}
}

const styles = {
	containerStyle: {
		borderWidth: 1,
		flexDirection: 'column',
		alignItems: 'center',
		width: 90
	},
	iconStyle: {
		width: 50,
		height: 50
	}
};

const mapStateToProps = state => {
	const { units } = state.settings;

	return { units };
};

export default connect(mapStateToProps, { unitsChange })(ForecastListItem);
