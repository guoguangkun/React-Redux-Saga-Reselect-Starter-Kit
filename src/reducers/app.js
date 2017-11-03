import { createAction, createReducer } from 'redux-act';

const initialState = {
    isFirstFetching: true,
    running: true,
    fetchingUserTree: false,
    fetchingChartTree: false,
    fetchingLogData: false,
    fetchingSchema: false,
    fetchingMgmtIndicator: false,
    fetchingMgmtIndicatorAdd: false,
    fetchingMgmtIndicatorCheck: false,
    fetchingMgmtIndicatorDestroy: false,
    fetchingMgmtIndicatorEdit: false,
    fetchingMgmtIndicatorCreate: false,
    fetchingMgmtIndicatorCategory: false,
    fetchingMgmtIndicatorCategoryAdd: false,
    fetchingMgmtIndicatorCategoryEdit: false,
    fetchingMgmtIndicatorCategoryDestroy: false,
    notification: false,
    fetchErrMessage: '',
    leftSideHeight: 0,
    dataShowType: 'table',
    modalVisible: false,
};

export const getStatus = createAction('get status');
export const firstFetching = createAction('fetching');
export const fetching = createAction('fetching');
export const fetchend = createAction('fetchend');
export const fetchErr = createAction('fetchErr');
export const hideNotification = createAction('hide Notification');
export const setLeftAsideHeight = createAction('set leftAsideContainer height');
export const changeDataShowType = createAction('change data showType');
export const setModalVisible = createAction('set modal visible');

const stringReducer = createReducer({
    [getStatus]: (state, payload) => ({ ...state, running: !state.running }),
    [firstFetching]: (state, payload) => ({ ...state, ...payload }),
    [fetching]: (state, payload) => ({ ...state, ...payload }),
    [fetchend]: (state, payload) => ({ ...state, ...payload }),
    [fetchErr]: (state, payload) => ({ ...state, fetchErrMessage: payload, notification: true }),
    [hideNotification]: (state, payload) => ({ ...state, notification: false, fetchErrMessage: '' }),
    [setLeftAsideHeight]: (state, payload) => ({ ...state, leftSideHeight: payload }),
    [changeDataShowType]: (state, payload) => ({ ...state, dataShowType: payload }),
    [setModalVisible]: (state, payload) => ({ ...state, ...payload }),

}, initialState);
export default stringReducer;
