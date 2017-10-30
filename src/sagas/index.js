/**
 * Created by malin on 16/12/7.
 */
import {delay} from 'redux-saga';
import {takeEvery, takeLatest, put, call, all} from 'redux-saga/effects';
import fetch from 'superagent';
import API from '../../config/api';
import * as HomeAction from '../reducers/home';
import * as CounterAction from '../reducers/counter';

var req = '';
export function fetchGetApi(params) {
    req = fetch.get(params.api, params.params)
        .timeout(60000)
        .withCredentials();
    // apiAddress = params.api;
    return req.then(response => {
        return response.body;
    }).then(json => {
        return json;
    });
}

export function fetchPostApi(params) {

    req = fetch.post(params.api)
        .timeout(60000)
        .withCredentials()
        .send(params.params)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    // apiAddress = params.api;
    return req.then(response => {
        return response.body;
    }).then(json => {
        return json;
    });
}

const fetchConfig = {
    'INCREMENT_ASYNC': incrementAsync,
    'searchIpAddress': fetchGetApi
};

export function* fetchData(params) {
    let data = '';
    try {
        data = yield call(fetchConfig[params.type], params);
        // 全局返回数据处理
    } catch (err) {
        //TODO 错误处理重写
        // logException(err);
        // yield put(AppAction.fetchErr(err.msg || String(err)));
        // yield put(AppAction.fetchend({[params.fetching]: false}));
        return false;
    }
    switch (params.api) {
        case API.ipAddressApi:
            yield put(HomeAction.setAddress(data));
            break;
        default:
            break;
    }
}

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put(CounterAction.doubleAsync());
}

export function* watchAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
    yield takeLatest('searchIpAddress', fetchData)
}

export default function* rootSaga() {
    yield all([
        watchAsync()
    ])
}