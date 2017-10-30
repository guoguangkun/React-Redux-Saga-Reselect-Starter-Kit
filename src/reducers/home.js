import {createAction, createReducer} from 'redux-act';

const initialState = {
    host: 'www.baidu.com',
    address: ''
};

export const setHost = createAction('改变host输入框的值');
export const setAddress = createAction('设置ip地址');

const stringReducer = createReducer({
    [setHost]: (state, payload) => ({...state, host: payload}),
    [setAddress]: (state, payload) =>  {
        console.log(payload);
        return Object.assign({}, state, {address: payload})
    },

}, initialState);
export default stringReducer;


