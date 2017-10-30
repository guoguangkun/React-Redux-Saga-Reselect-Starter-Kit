import {createAction, createReducer} from 'redux-act';

const initialState = {
    counter: 11
};

export const increment = createAction('增加点击次数');
export const doubleAsync = createAction('异步当前数量＊2');

const stringReducer = createReducer({
    [increment]: (state, payload) => ({...state, counter: state.counter += 1}),
    [doubleAsync]: (state, payload) => ({...state, counter: state.counter * 2}),

}, initialState);
export default stringReducer;


