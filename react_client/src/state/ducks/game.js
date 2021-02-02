import { createAction } from "redux-api-middleware";

// Action creators
export const getState = (id) =>
  createAction({
    endpoint: `http://localhost:3030/game/${id}`,
    method: "GET",
    types: [GET_STATE_REQUEST, GET_STATE_SUCCESS, GET_STATE_FAILURE],
  });

export const newState = (id, game) =>
  createAction({
    endpoint: `http://localhost:3030/game/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
    types: [NEW_STATE_REQUEST, NEW_STATE_SUCCESS, NEW_STATE_FAILURE],
  });

// Reducer
const initialState = {
  state: "Waiting for players",
  players: {},
  spectators: {},
  round: 1,
  points: {},
  moves: {},
  comments: {},
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATE_SUCCESS:
      return action.payload ? action.payload : state;
    case NEW_STATE_SUCCESS:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
}

// Selectors
export const gameSelector = (state) => {
  return state.gameReducer;
};

// Types
export const GET_STATE_REQUEST = "morra/game/GET_STATE_REQUEST";
export const GET_STATE_SUCCESS = "morra/game/GET_STATE_SUCCESS";
export const GET_STATE_FAILURE = "morra/game/GET_STATE_FAILURE";

export const NEW_STATE_REQUEST = "morra/game/NEW_STATE_REQUEST";
export const NEW_STATE_SUCCESS = "morra/game/NEW_STATE_SUCCESS";
export const NEW_STATE_FAILURE = "morra/game/NEW_STATE_FAILURE";
