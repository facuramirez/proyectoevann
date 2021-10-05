import { GET_CARS,
         INITIAL_GET_CARS,
         INITIAL_GET_CONDUCTORES,
         GET_CONDUCTORES,
         EDIT_ASSOCIATED
} from './Actions';

const initialState = {
    cars: [],
    drivers: [],
    conductores: [],
    editAssociated: {}
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case INITIAL_GET_CARS: return {
            ...state,
            cars: action.payload
        }
        case GET_CARS: return {
            ...state,
            cars: action.payload
        }
        case INITIAL_GET_CONDUCTORES: return {
            ...state,
            cars: action.payload
        }
        case GET_CONDUCTORES: return {
            ...state,
            conductores: action.payload
        }
        case EDIT_ASSOCIATED: return {
            ...state,
            editAssociated: action.payload
        }
        default: return state;
    }
}