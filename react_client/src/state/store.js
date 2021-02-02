import { createStore, applyMiddleware, combineReducers } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import homeReducer from "./ducks/home";
import gameReducer from "./ducks/game";

const rootReducer = combineReducers({
  homeReducer,
  gameReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(apiMiddleware, thunk))
);

export default store;
