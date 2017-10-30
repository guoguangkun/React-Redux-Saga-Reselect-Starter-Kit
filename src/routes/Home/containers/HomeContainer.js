import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {homeSelector} from '../../../selectors/index';
import API from '../../../../config/api';
import APP from '../../../../config/global';
import HomeView from '../components/HomeView'

class HomeContainer extends Component {

    handleClick = (event) => {
        this.props.dispatch({
            type: `searchIp`,
            api: API.ipApi,
        });
    };

    render() {
        const { address } = this.props;
        return <HomeView title={APP.h1} address={address} buttonText={APP.button.searchIP} handleClick={this.handleClick} />
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
});


export default connect(homeSelector, mapDispatchToProps)(HomeContainer)
