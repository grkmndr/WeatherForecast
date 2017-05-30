import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import S from 'string';
import ForecastListItem from './ForecastListItem';
import { forecastFetch, unitsChange } from '../actions';

const baseURL = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '9532d6af0385dd5f5c82a63d80413570';

class ForecastListView extends Component {


	componentWillMount() {
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props

		if (this.props.currentCity !== nextProps.currentCity || this.props.units !== nextProps.units) {
			console.log(this.props.currentCity !== nextProps.currentCity);
			console.log(this.props.units !== nextProps.units);
			const currentCityWithoutSpaces = S(nextProps.currentCity).replaceAll(' ', '').s;
			this.props.forecastFetch(baseURL, 'forecast', nextProps.units, API_KEY, currentCityWithoutSpaces);
		}


		this.createDataSource(nextProps);
	}

	createDataSource({ forecastItems }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(forecastItems);
	}

	renderRow(forecastItem) {
		return (
			<ForecastListItem forecastItem={forecastItem} />
		);
	}

	render() { 
		return (
			<ListView
				enableEmptySections
				horizontal
				style={{ flex: 1 }}
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = state => {
	const { forecastItems } = state.forecast;

	const { units } = state.settings;

	return { forecastItems, units };
};

export default connect(mapStateToProps, { forecastFetch, unitsChange })(ForecastListView);
