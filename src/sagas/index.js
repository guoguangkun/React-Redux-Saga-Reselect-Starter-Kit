/**
 * Created by malin on 16/12/7.
 */
import { delay } from 'redux-saga';
import { takeEvery, takeLatest, put, call, all } from 'redux-saga/effects';
import fetch from 'superagent';
import API from '../../config/api';
import * as HomeAction from '../reducers/home';
import * as CounterAction from '../reducers/counter';

let req = '';
let apiAddress = '';
export function fetchGetApi(params) {
    if ((params.api === apiAddress) && req) {
        req.abort();
    }
    req = fetch.get(params.api, params.params)
        .timeout(60000)
        .withCredentials();
    apiAddress = params.api;
    return req.then(response => response.body).then(json => json);
}

export function fetchPostApi(params) {
    if ((params.api === apiAddress) && req) {
        req.abort();
    }
    req = fetch.post(params.api)
        .timeout(60000)
        .withCredentials()
        .send(params.params)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    apiAddress = params.api;
    return req.then(response => response.body).then(json => json);
}

const fetchConfig = {
    INCREMENT_ASYNC: incrementAsync,
    searchIpAddress: fetchGetApi,
    searchIp: fetchGetApi,
};

export function* fetchData(params) {
    let data = '';
    try {
        data = yield call(fetchConfig[params.type], params);
        // 全局返回数据处理
    } catch (err) {
        // TODO 错误处理重写
        // logException(err);
        // yield put(AppAction.fetchErr(err.msg || String(err)));
        // yield put(AppAction.fetchend({[params.fetching]: false}));
        return false;
    }
    switch (params.api) {
        case API.ipApi:
            console.log(data);
            yield put(HomeAction.setAddress(data));
            break;
        default:
            break;
    }
    return false;
}

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put(CounterAction.doubleAsync());
}

export function* watchAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
    yield takeLatest('searchIp', fetchData);
}

export default function* rootSaga() {
    yield all([
        watchAsync(),
    ]);
}
