import {
	UNITS_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
	units: 'metric'
};

export default (state = INITIAL_STATE, action) => {
	console.log(state.units);
	switch (action.type) {
		case UNITS_CHANGE: {
			return { 
				...state, 
				units: (state.units === 'metric') ? 'imperial' : 'metric'
			};
		}
		default:
			return state;
	}
};
