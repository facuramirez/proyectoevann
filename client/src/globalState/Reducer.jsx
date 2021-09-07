import { GET_CARS, INITIAL_GET_CARS } from './Actions';

const initialState = {
    cars: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case INITIAL_GET_CARS: return {
            cars: action.payload
        }
        case GET_CARS: return {
            cars: action.payload
        }
        default: return state;
    }
}