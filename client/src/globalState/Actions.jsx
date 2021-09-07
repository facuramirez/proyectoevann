export const INITIAL_GET_CARS = "INITIAL_GET_CARS";
export const GET_CARS = "GET_CARS";

export function initialGetCars(cars) {
    cars = cars.slice(0, 5);
    return { type: INITIAL_GET_CARS, payload: cars }
}

export function filterCars(cars) {
    return { type: GET_CARS, payload: cars }
}