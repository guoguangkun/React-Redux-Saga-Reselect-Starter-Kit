import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterSelector } from '../../../selectors/index';
import * as CounterAction from '../../../reducers/counter';

import NoFoundPage from '../components/NoFoundPage';

const NoFoundPageContainer = () => (
    <NoFoundPage pathname={this.props.location.pathname}/>
);

const mapDispatchToProps = dispatch => ({
    increment: bindActionCreators(CounterAction.increment, dispatch),
    doubleAsync: bindActionCreators(CounterAction.doubleAsync, dispatch),
    dispatch,
});


export default connect(counterSelector, mapDispatchToProps)(NoFoundPageContainer);
