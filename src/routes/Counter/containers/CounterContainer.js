import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterSelector } from '../../../selectors/index';
import * as CounterAction from '../../../reducers/counter';

import Counter from '../components/Counter';

class CounterContainer extends Component {
    doubleAsync = () => {
        console.log(2);
        this.props.dispatch({
            type: 'INCREMENT_ASYNC',
            // api: fetchApi.mgmt[`indicator${this.props.page}Edit`],
            // fetching: `fetchMgmtIndicator${this.props.page}Edit`,
            // params: {id: id}
        });
    };

    render() {
        const { counter, increment, running } = this.props;
        return (
            <Counter
                counter={counter}
                running={running}
                increment={increment}
                doubleAsync={this.doubleAsync}
            />
        );
    }
}

CounterContainer.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    dispatch: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    increment: bindActionCreators(CounterAction.increment, dispatch),
    doubleAsync: bindActionCreators(CounterAction.doubleAsync, dispatch),
    dispatch,
});

export default connect(counterSelector, mapDispatchToProps)(CounterContainer);
