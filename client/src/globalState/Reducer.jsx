import { GET_CARS,
         INITIAL_GET_CARS,
         INITIAL_GET_CONDUCTORES,
         GET_CONDUCTORES
} from './Actions';

const initialState = {
    cars: [],
    drivers: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case INITIAL_GET_CARS: return {
            cars: action.payload
        }
        case GET_CARS: return {
            cars: action.payload
        }
        case INITIAL_GET_CONDUCTORES: return {
            cars: action.payload
        }
        case GET_CONDUCTORES: return {
            conductores: action.payload
        }
        default: return state;
    }
}