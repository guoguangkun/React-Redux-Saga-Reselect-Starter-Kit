import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.scss';

const HomeView = ({ title, address, buttonText, handleClick }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{`${address.country} ${address.province} ${address.city}`}</p>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
};
HomeView.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    buttonText: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default HomeView;
