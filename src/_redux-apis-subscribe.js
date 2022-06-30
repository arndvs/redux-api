import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

//   Redux only requires type, others are payload, error, meta
// const incrementAction = {
//   // All Caps for Action Types (non-redux-toolkit)
//   type: "INCREMENT",
//   payload: 5,
//   error: true,
//   meta: {},
// };

/**
 * Redux Store and Reducers
 * we need to provide an argument that is a reducer and a reducer is a function.
 */

const initialState = { value: 0 };

// changes the string to an Easy Variable
const INCREMENT = "INCREMENT";
const ADD = "ADD";

// Action Creators - functions that create actions
// allow you to change a feature everywhere
// the function that uses it without having to update it everywhere

// increment Action Creator is a function with a type: INCREMENT
const increment = () => ({ type: INCREMENT });
const add = (number) => ({ type: ADD, payload: number });

/**
 * A reducer is a function where the first argument is the current
 * state of the world and the second is something that happened.
 * Somewhere inside of the function, we figure out what the new
 * state of the world ought to be based on whatever happened.
 */

// must pass initial state in the individual reducer
const reducer = (state = initialState, action) => {
  // Action Type - calls the action creator function rather than putting the function directly in the reducer
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }
  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }
  //    if none of the conditionals are hit, still need to return something
  return state;
};

/**
 * / Redux Reducers
 */

const store = createStore(reducer);

const subscriber = () => console.log("Subscriber!", store.getState());

const unsubscribe = store.subscribe(subscriber);

store.dispatch(increment()); // "Subscriber! 1"
store.dispatch(add(4)); // "Subscriber! 5"

unsubscribe();
console.log("Unsubscribe");

store.dispatch(add(54321)); // "54326"

console.log(store.getState().value);

//Dispatch the Action Creator (increment)
store.dispatch(increment());
console.log("Dispatch increment");
console.log(store.getState());
store.dispatch(increment());
console.log("Dispatch increment");
console.log(store.getState());
store.dispatch(add(100));
console.log("Dispatch add(100)");
console.log(store.getState());

console.log("Bind Action Creators");
// BindactionCreators - takes an object full of functions with keys and values, and gives whatever you want to bind to
// actions bound to the dispatch to call
// First object is all the action creators you want to bind, second is what you want to bind it to
const actions = bindActionCreators(
  {
    increment,
    add,
  },
  store.dispatch
);
actions.add(420); //54848
console.log(store.getState().value);
actions.increment(); //54849
console.log("Actions", actions);
console.log(store.getState().value);

/**
 * Redux Compose
 */
//   Let's say that we had a bunch of functions that each take a string and return a modified string.
const makeLouder = (string) => string.toUpperCase();
const repeatThreeTimes = (string) => string.repeat(3);
const embolden = (string) => string.bold();

//   compose gives us a simple way to compose functions out of other functions.
const makeLouderRepeatThreeTimesAndEmbolden = compose(
  embolden,
  repeatThreeTimes,
  makeLouder
);
console.log(store, store.value, initialState);
console.log(makeLouderRepeatThreeTimesAndEmbolden("hello"));
/**
 * / Redux Compose
 */

// const reducer = (state = { count: 1 }) => state;

// const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
//   const monitoredReducer = (state, action) => {
//     const start = performance.now();
//     const newState = reducer(state, action);
//     const end = performance.now();
//     const diff = end - start;
//     console.log(diff);

//     return newState;
//   };

//   return createStore(monitoredReducer, initialState, enhancer);
// };

// const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
//   const logReducer = (state, action) => {
//     console.log("old state", state, action);
//     const newState = reducer(state, action);
//     console.log("new state", newState, action);

//     return newState;
//   };

//   return createStore(logReducer, initialState, enhancer);
// };

// const logMiddleware = (store) => (next) => (action) => {
//   console.log("old state", store.getState(), action);
//   next(action);
//   console.log("new state", store.getState(), action);
// };

// const monitorMiddleware = (store) => (next) => (action) => {
//   const start = performance.now();
//   next(action);
//   const end = performance.now();
//   const diff = end - start;
//   console.log(diff);
// };

// const store = createStore(
//   reducer,
//   applyMiddleware(logMiddleware, monitorMiddleware)
// );

// store.dispatch({ type: "Hello" });
