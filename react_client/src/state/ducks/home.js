import { v4 as uuid } from "uuid";

// Action creators
export const changeName = (name) => ({
  type: CHANGE_NAME,
  payload: name,
});

// Reducer
const initialState = {
  id: JSON.parse(localStorage.getItem("home"))?.id || uuid(),
  name: JSON.parse(localStorage.getItem("home"))?.name || undefined,
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      localStorage.setItem(
        "home",
        JSON.stringify({
          ...state,
          name: action.payload,
        })
      );
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}

// Selectors
export const homeSelector = (state) => {
  return state.homeReducer;
};

// Types
export const CHANGE_NAME = "morra/home/CHANGE_NAME";
