import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ counter, increment, doubleAsync, running }) => (
    <div style={{ margin: '0 auto' }}>
        <h2>Counter: {counter}</h2>
        <p> {!running + 1}</p>
        <button className="btn btn-primary" onClick={increment}>
            Increment
        </button>
        {' '}
        <button className="btn btn-secondary" onClick={doubleAsync}>
            Double (Async)
        </button>
    </div>
);

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
};

export default Counter;
