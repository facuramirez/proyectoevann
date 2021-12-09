import {
  GET_CARS,
  INITIAL_GET_CARS,
  INITIAL_GET_CONDUCTORES,
  GET_CONDUCTORES,
  EDIT_ASSOCIATED,
  GET_USER,
  GET_OWNERS,
  GET_ID,
  GET_DRIVER,
} from "./Actions";

const initialState = {
  cars: [],
  drivers: [],
  conductores: [],
  editAssociated: {},
  user: {},
  owners: [],
  id: "",
  driver: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_GET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case INITIAL_GET_CONDUCTORES:
      return {
        ...state,
        conductores: action.payload,
      };
    case GET_CONDUCTORES:
      return {
        ...state,
        conductores: action.payload,
      };
    case EDIT_ASSOCIATED:
      return {
        ...state,
        editAssociated: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_OWNERS:
      return {
        ...state,
        owners: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        id: action.payload,
      };
    case GET_DRIVER:
      return {
        ...state,
        driver: action.payload,
      };
    default:
      return state;
  }
}
