import React, {Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {counterSelector} from '../../../selectors/index';
import * as CounterAction from '../../../reducers/counter'

import Counter from '../components/Counter'

class CounterContainer extends Component {

  doubleAsync = () => {
    console.log(2);
    this.props.dispatch({
      type: `INCREMENT_ASYNC`,
      // api: fetchApi.mgmt[`indicator${this.props.page}Edit`],
      // fetching: `fetchMgmtIndicator${this.props.page}Edit`,
      // params: {id: id}
    });
  }
  render() {
    const {counter, increment, running} = this.props;
    return <Counter counter={counter} running={running} increment={increment} doubleAsync={this.doubleAsync} />
  }
}


/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */



const mapDispatchToProps = (dispatch) => ({
  increment: bindActionCreators(CounterAction.increment, dispatch),
  doubleAsync: bindActionCreators(CounterAction.doubleAsync, dispatch),
  dispatch
});



/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(counterSelector, mapDispatchToProps)(CounterContainer)
