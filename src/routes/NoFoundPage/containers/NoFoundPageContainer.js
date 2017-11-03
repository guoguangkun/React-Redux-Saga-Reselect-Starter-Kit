import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoFoundPage from '../components/NoFoundPage';

const NoFoundPageContainer = ({ location }) => (
    <NoFoundPage pathname={location.pathname}/>
);

NoFoundPageContainer.propTypes = {
    location: PropTypes.object.isRequired,

};

export default connect(null, null)(NoFoundPageContainer);
