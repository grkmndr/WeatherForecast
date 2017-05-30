import firebase from 'firebase';
import {
	BOOKMARK_ADD,
	BOOKMARKS_FETCH_SUCCESS
} from './types';

export const bookmarksFetch = () => {
	return (dispatch) => {
		firebase.database().ref('/bookmarks')
			.on('value', snapshot => {
				dispatch({ type: BOOKMARKS_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const bookmarkAdd = (bookmarkCityName) => {
	return (dispatch) => {
		firebase.database().ref('/bookmarks')
			.push({ bookmarkCityName })
			.then(() => {
				dispatch({ type: BOOKMARK_ADD, payload: bookmarkCityName });
			});
	};
};

export const bookmarkDelete = ({ uid }) => {
	return () => {
		firebase.database().ref(`/bookmarks/${uid}`)
			.remove()
			.then(() => {
				console.log('Delete Successful');
			});
	};
};
