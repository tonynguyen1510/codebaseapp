import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from './store/NavigatorState';
import CounterStateReducer from './store/CounterState';
import SessionStateReducer, {RESET_STATE} from './store/SessionState';
import AuthState from './store/AuthState';
import MessageBoxState from './store/MessageBoxState';
import LoaderState from './store/loader';
import { reducer as formReducer } from 'redux-form/immutable';
// ## Generator Reducer Imports

const reducers = {
  // Counter sample app state. This can be removed in a live application
  counter: CounterStateReducer,
  // ## Generator Reducers
	auth: AuthState,
	loader: LoaderState,
	messageBox: MessageBoxState,
	form: formReducer,
  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
