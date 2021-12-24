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
  INITIAL_GET_VEHICULOS,
  INITIAL_GET_ASOCIADOS,
  GET_OWNER,
  GET_EARRINGS_CARS,
  GET_CAR,
  GET_ADMINS
} from "./Actions";

const initialState = {
  cars: [],
  drivers: [],
  conductores: [],
  asociados: [],
  editAssociated: {},
  user: {},
  vehiculos: [],
  owners: [],
  owner: {},
  id: "",
  driver: {},
  earring_cars: [],
  car: {},
  admins: []
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
    case INITIAL_GET_VEHICULOS:
      return {
        ...state,
        vehiculos: action.payload,
      };
    case INITIAL_GET_ASOCIADOS:
      return {
        ...state,
        asociados: action.payload,
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
    case GET_OWNER:
      return {
        ...state,
        owner: action.payload,
      };
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
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
    case GET_EARRINGS_CARS:
      return {
        ...state,
        earring_cars: action.payload,
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload,
      };
    default:
      return state;
  }
}
