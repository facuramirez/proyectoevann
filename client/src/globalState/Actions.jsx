export const INITIAL_GET_CARS = "INITIAL_GET_CARS";
export const GET_CARS = "GET_CARS";
export const INITIAL_GET_CONDUCTORES = "INITIAL_GET_CONDUCTORES";
export const GET_CONDUCTORES = "GET_CONDUCTORES";
export const EDIT_ASSOCIATED = "EDIT_ASSOCIATED";
export const GET_USER = "GET_USER";

export function initialGetCars(cars) {
    cars = cars.slice(0, 5);
    return { type: INITIAL_GET_CARS, payload: cars }
}

export function filterCars(cars) {
    return { type: GET_CARS, payload: cars }
}

export function initialGetConductores(conductores) {
    conductores = conductores.slice(0, 5);
    return { type: INITIAL_GET_CONDUCTORES, payload: conductores}
}

export function filterConductores(conductores) {
    return { type: GET_CONDUCTORES, payload: conductores }
}

export function editAssociated(dataAssociated) {
    return { type: EDIT_ASSOCIATED, payload: dataAssociated }
}

export function dataUser(data) {
    return { type: GET_USER, payload: data}
}
