import React, { Component } from 'react';
import { 
	Text, 
	TouchableWithoutFeedback, 
	View,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { bookmarkDelete, bookmarkLocationFetch, unitsChange } from '../actions';

const baseURL = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '9532d6af0385dd5f5c82a63d80413570';

class BookmarkListItem extends Component {
	onDeletePress() {
		const { uid } = this.props.bookmark;
		this.props.bookmarkDelete({ uid });
	}

	onRowPress() {
		const { bookmarkCityName } = this.props.bookmark;
		this.props.bookmarkLocationFetch(baseURL, 'weather', this.props.units, API_KEY, bookmarkCityName);
	}

	render() {
		const { bookmarkCityName } = this.props.bookmark;

		const {
			titleStyle,
			deleteButtonContainerStyle,
			deleteTextStyle,
			deleteContainerStyle
		} = styles;

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<CardSection style={{ alignItems: 'center' }} >
						<Text style={titleStyle}>
							{bookmarkCityName}
						</Text>
						<View 
							style={deleteButtonContainerStyle}
						>
							<TouchableOpacity 
								onPress={this.onDeletePress.bind(this)}
								style={deleteContainerStyle} 
							>
								<Text style={deleteTextStyle} >
									X
								</Text>
							</TouchableOpacity>
						</View>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = state => {
	const { units } = state.settings;
	
	return { units };
};

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	},
	deleteButtonContainerStyle: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'flex-end', 
		marginRight: 15
	},
	deleteTextStyle: {
		color: '#fff',
		fontSize: 18,
		alignSelf: 'center'
	},
	deleteContainerStyle: {
		width: 20,
		backgroundColor: 'red',
		flexDirection: 'column',
		justifyContent: 'center'
	}
};

export default connect(mapStateToProps, { bookmarkDelete, bookmarkLocationFetch, unitsChange })(BookmarkListItem);
