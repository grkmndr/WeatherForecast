import React, { Component } from 'react';
import { Switch, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { unitsChange } from '../actions';

class SettingsView extends Component {
	state = {
		switchIsOn: true
	};

	onSwitchPressed() {
		this.props.unitsChange();
	}

	render() {
		return (
			<Card>
				<CardSection style={{ alignItems: 'center', justifyContent: 'space-around' }}>
					<Text style={{ fontSize: 18 }}>Units: {this.props.units === 'metric' ? 'Metric' : 'Imperial'}</Text>
					<Switch 
						onValueChange={(value) => {
							this.onSwitchPressed();
							this.setState({ switchIsOn: value });
						}}
						style={{ marginRight: 30 }}
						value={this.state.switchIsOn}
					/>
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { units } = state.settings;

	return { units };
};

export default connect(mapStateToProps, { unitsChange })(SettingsView);
