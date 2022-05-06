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
  GET_ADMINS,
  GET_PENDING,
  GET_PENDING_DATA,
  GET_CONVENIOS,
  GET_USERS_BUSINESS,
  GET_TRIPS
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
  admins: [],
  pending: [],
  pendingData: [],
  convenios: [],
  usersBusiness: [],
  trips: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload,
      };
    case GET_USERS_BUSINESS:
      return {
        ...state,
        usersBusiness: action.payload,
      };
    case GET_CONVENIOS:
      return {
        ...state,
        convenios: action.payload,
      };
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
    case GET_PENDING:
      return {
        ...state,
        pending: action.payload,
      };
    case GET_PENDING_DATA:
      return {
        ...state,
        pendingData: action.payload,
      };
    default:
      return state;
  }
}
