//location 通过redux 管理
import {createAction, createReducer} from 'redux-act';

const initialState = {
    pathname: '/'
};
export const locationChange = createAction('update location');

const stringReducer = createReducer({
    [locationChange]: (state, payload) => ({...state, ...payload}),
}, initialState);

export const updateLocation = ({ dispatch }) => {
    return (nextLocation) => dispatch(locationChange(nextLocation))
};
export default stringReducer;