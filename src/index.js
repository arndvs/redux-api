import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

const initialState = {
  users: [
    { id: 1, name: "Steve" },
    { id: 2, name: "Eric" },
  ],
  tasks: [
    { title: "File the TPS reports", assignedTo: 1 },
    { title: "Order more energy drinks", assignedTo: null },
  ],
};

const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";

const addTask = (title) => ({ type: ADD_TASK, payload: { title } });
const addUser = (id, name) => ({ type: ADD_USER, payload: { id, name } });

const userReducer = (users = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...users, action.payload];
  }
  return users;
};

const taskReducer = (tasks = initialState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...tasks, action.payload];
  }
  return tasks;
};

const reducer = combineReducers({ users: userReducer, tasks: taskReducer });

const store = createStore(reducer, initialState);

console.log(store.getState());

store.dispatch(addTask("Record the statistics"));
store.dispatch(addUser(3, "James"));

console.log(store.getState());
