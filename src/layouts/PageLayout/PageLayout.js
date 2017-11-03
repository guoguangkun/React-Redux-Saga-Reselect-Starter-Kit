import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import './PageLayout.scss';

export const PageLayout = ({ children }) => (
    <div className="container text-center">
        <IndexLink to="/" activeClassName="page-layout__nav-item--active">Home</IndexLink>
        {' · '}
        <Link to="/counter" activeClassName="page-layout__nav-item--active">Counter</Link>
        {' · '}
        <Link to="/no" activeClassName="page-layout__nav-item--active">NoFoundPage</Link>
        <div className="page-layout__viewport">
            {children}
        </div>
    </div>
);
PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageLayout;
