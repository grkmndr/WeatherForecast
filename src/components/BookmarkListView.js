import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import BookmarkListItem from './BookmarkListItem';
import { bookmarkAdd, bookmarkDelete, bookmarksFetch } from '../actions';
import { Card } from './common';

class BookmarkListView extends Component {

	state = {
		searchResults: []
	}

	componentWillMount() {
		this.props.bookmarksFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ bookmarks }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(bookmarks);
	}

	filterSearch(text) {
        const newData = this.props.bookmarks.filter((item) => {
            const itemData = item.bookmarkCityName.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.createDataSource({ bookmarks: newData });
        this.setState({ searchResults: newData });
	}

	renderRow(bookmark) {
		return (
			<BookmarkListItem bookmark={bookmark} />
		);
	}

	render() {
		const { textInputStyle } = styles;
		return (
			<Card style={{ flex: 1, marginBottom: 10 }}>
				<TextInput 
                    style={textInputStyle}
                    onChangeText={(text) => this.filterSearch(text)}                    
				/>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</Card>
		);
	}
}

const styles = {
	textInputStyle: {
		height: 40,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10
	}
};

const mapStateToProps = state => {
	const bookmarks = _.map(state.bookmarks, (val, uid) => {
		return { ...val, uid };
	});	

	return { bookmarks };
};

export default connect(mapStateToProps, {
	bookmarkAdd,
	bookmarkDelete,
	bookmarksFetch
})(BookmarkListView);
