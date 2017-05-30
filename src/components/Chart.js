import _ from 'lodash';
import React, { Component } from 'react';
import {
	ScrollView,
	Text
} from 'react-native';
import { 
	VictoryAxis, 
	VictoryLine, 
	VictoryChart,
	VictoryLabel
} from 'victory-native';
import { connect } from 'react-redux';
import { forecastFetch, unitsChange } from '../actions';

class Chart extends Component {
	state = {
		data: []
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.forecastItems.length > 0) {
			console.log('hi');
			this.setState({ data: [...this.state.data, nextProps.forecastItems] });
			//data = [...data, nextProps.forecastItems];
		}
	}

	getTickValuesX() {
		const tickValues = _.map(this.state.data[0], (dataItem) => {
				return dataItem.dt;
			});

		return (tickValues);
	}

	getTickDomainY() {
		const temperatures = _.map(this.state.data[0], (dataItem) => {
			return dataItem.temperature;
		});

		const max = Math.max(...temperatures);
		const min = Math.min(...temperatures);

		console.log('MİNMAX: ' + [min, max]);
		
		return [min, max];
	}

	getDays() {
		const dayItems = _.map(this.state.data[0], (dataItem) => {
			const dt = dataItem.dt;
			const a = new Date(dt * 1000);
			const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return days[a.getDay()];
		});

		return dayItems;
	}

	render() {
		console.log('tick: ');
		console.log(this.state.data[0]);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.text}>{'Victory Tutorial'}</Text>
				<VictoryChart
					domainPadding={40}
				>
					<VictoryLabel 
						text='Temperature'
						x={15}
						y={30}
					/>
					<VictoryAxis
						axisLabelComponent={<VictoryLabel text='Date' />}
						tickValues={this.getDays()}
						/*tickFormat={(tick) => {
							this.getTickValuesX()[tick];
						}}*/
					/>
					<VictoryAxis
						dependentAxis
						domain={this.getTickDomainY()}
						orientation='left'
						scale='linear'
					/>
					<VictoryLine
						data={this.state.data[0]}
						x={'temperature'}
						y={'dt'}
					/>
				</VictoryChart>
			</ScrollView>
		);
	}
}
  
const styles = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 100
},
	text: {
		fontSize: 18,
		fontFamily: 'Menlo',
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 30
	}
};


export default Chart;
