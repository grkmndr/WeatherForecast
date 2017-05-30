import {
	BOOKMARK_ADD
} from '../actions/types';

const INITIAL_STATE = {
	bookmarkCityName: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case BOOKMARK_ADD: {
			// example of a payload: action.payload === { prop: 'name', value: 'jane' }
			// The code below is called key interpolation, for example; if action.payload.prop is 'name' then "[action.payload.prop]: action.payload.value" will be interpreted as { name: value }
			const { bookmarkCityName } = action.payload;
			
			return { 
				...state, 
				bookmarkCityName
			};
		}
		default:
			return state;
	}
};
