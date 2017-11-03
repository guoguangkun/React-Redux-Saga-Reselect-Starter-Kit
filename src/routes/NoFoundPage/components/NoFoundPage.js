import React from 'react';
import PropTypes from 'prop-types';

const NoFoundPage = ({ pathname }) => (
    <div style={{ margin: '0 auto' }}>
        <p> 404</p>
        <p>
            {pathname} is not defined.
        </p>
    </div>
);
NoFoundPage.propTypes = {
    pathname: PropTypes.string.isRequired,
};

export default NoFoundPage;
