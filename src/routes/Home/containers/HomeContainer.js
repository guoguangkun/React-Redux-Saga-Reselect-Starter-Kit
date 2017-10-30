import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {homeSelector} from '../../../selectors/index';
import * as HomeAction from '../../../reducers/home'
import API from '../../../../config/api';
import APP from '../../../../config/global';
import HomeView from '../components/HomeView'

class HomeContainer extends Component {

    handleClick = (event) => {
        this.props.setHost(this.props.host)
        this.props.dispatch({
            type: `searchIpAddress`,
            api: API.ipAddressApi,
            // fetching: `fetchMgmtIndicator${this.props.page}Edit`,
            params: {ip: this.props.host, key: '2266d361586bd9978712685616fd66ee'}
        });
    };

    handleChange = (event) => {
        this.props.setHost(event.target.value)
    };

    render() {
        const {host, address} = this.props;
        return <HomeView title={APP.h1} host={host} address={address} handleClick={this.handleClick} handleChange={this.handleChange}/>
    }
}


const mapDispatchToProps = (dispatch) => ({
    setHost: bindActionCreators(HomeAction.setHost, dispatch),
    // increment: bindActionCreators(HomeAction.increment, dispatch),
    // doubleAsync: bindActionCreators(HomeAction.doubleAsync, dispatch),
    dispatch
});


export default connect(homeSelector, mapDispatchToProps)(HomeContainer)
