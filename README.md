# redux-enhancer-react-native-network
Connect redux to the network changes

## Installation

```
npm install --save redux-enhancer-react-native-network
```

## Usage

When you create your Redux store, add the enhancer:

```javascript
import { createStore } from 'redux';
import applyNetworkListener from 'redux-enhancer-react-native-network';

...

const store = createStore(reducers, initalState, [
  applyNetworkListener(),
]);
```

The store will now automatically dispatch an action:

```javascript
{
  type: STATUS_CHANGED,
  payload: {
    isConnected: boolean
  }
}
```

For instance, you can use it in a reducer:
```javascript
import { STATUS_CHANGED } from 'redux-enhancer-react-native-network';

function reducer(state = '', action) {

  switch (action.type) {
    case STATUS_CHANGED:
      return action.payload.isConnected ?  'you are connected' : 'you are not connected';
    default:
      return state
  }
}
```

### Usage with Redux Saga

Make sure that this enhancer is applied before the saga middleware.
Otherwise, your saga would not be able to intercept the actions.

```javascript
// good
const store = createStore(reducers, initalState, [
  applyNetworkListener(),
  applyMiddleware(sagaMiddleware),
]);

// bad
const store = createStore(reducers, initalState, [
  applyMiddleware(sagaMiddleware),
  applyNetworkListener(),
]);

// good (with compose)
const enhancers = [applyNetworkListener(), applyMiddleware(...middlewares)];

const store = () => {
  let store = createStore(persistedReducer, compose(...enhancers));
  return { ...store, runSaga: sagaMiddleware.run };
};
```

Then you can define a saga like:

```javascript
import { takeLatest } from 'redux-saga/effects';
import { STATUS_CHANGED } from 'redux-enhancer-react-native-network';

function* connectionStatusHasChanged() {
  // app connection status has changed
}

function* watchForConnectionStatusChange() {
  yield takeLatest(
    STATUS_CHANGED,
    catchApiExceptions(connectionStatusHasChanged),
  );
}
```

## Contributing

See [our contributing guidelines](https://bamlab.github.io/open-source/#contributing)
