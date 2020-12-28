import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.scss';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const initialCount = {
  count: 0,
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const incrementValue = () => ({ type: INCREMENT });
const decrementValue = () => ({ type: DECREMENT });
const resetValue = () => ({ type: RESET });

const reducer = (state = initialCount, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1,
    };
  } else if (action.type === DECREMENT) {
    return {
      count: state.count - 1,
    };
  } else if (action.type === RESET) {
    return {
      count: 0,
    };
  } else {
    return state;
  }
};

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment, decrement, reset } = this.props;

    console.log({ count, increment });

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </section>
      </main>
    );
  }
}

// MapStateToProps and MapDispatchToProps go to this.props (component props)
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment() {
      dispatch(incrementValue());
    },
    decrement() {
      dispatch(decrementValue());
    },
    reset() {
      dispatch(resetValue());
    },
  };
};

// Returns a function waiting for react component which is the Counter
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    {/* Higher order component */}
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
