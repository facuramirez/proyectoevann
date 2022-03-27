export const INITIAL_GET_CARS = "INITIAL_GET_CARS";
export const GET_CARS = "GET_CARS";
export const INITIAL_GET_CONDUCTORES = "INITIAL_GET_CONDUCTORES";
export const GET_CONDUCTORES = "GET_CONDUCTORES";
export const EDIT_ASSOCIATED = "EDIT_ASSOCIATED";
export const GET_USER = "GET_USER";
export const GET_OWNERS = "GET_OWNERS";
export const GET_ID = "GET_ID";
export const GET_DRIVER = "GET_DRIVER";
export const INITIAL_GET_VEHICULOS = "INITIAL_GET_VEHICULOS";
export const INITIAL_GET_ASOCIADOS = "INITIAL_GET_ASOCIADOS";
export const GET_OWNER = "GET_OWNER";
export const GET_EARRINGS_CARS = "GET_EARRINGS_CARS";
export const GET_CAR = "GET_CAR";
export const GET_ADMINS = "GET_ADMINS";
export const GET_PENDING = "GET_PENDING";
export const GET_PENDING_DATA = "GET_PENDING_DATA";
export const GET_CONVENIOS = "GET_CONVENIOS";

export function initialGetCars(cars) {
  // cars = cars.slice(0, 5);
  return { type: INITIAL_GET_CARS, payload: cars };
}

export function filterCars(cars) {
  return { type: GET_CARS, payload: cars };
}

export function initialGetConductores(conductores) {
  // conductores = conductores.slice(0, 5);
  return { type: INITIAL_GET_CONDUCTORES, payload: conductores };
}

export function initialGetVehiculos(vehiculos) {
  // conductores = conductores.slice(0, 5);
  return { type: INITIAL_GET_VEHICULOS, payload: vehiculos };
}

export function initialGetAsociados(asociados) {
  // conductores = conductores.slice(0, 5);
  return { type: INITIAL_GET_ASOCIADOS, payload: asociados };
}

export function filterConductores(conductores) {
  return { type: GET_CONDUCTORES, payload: conductores };
}

export function editAssociated(dataAssociated) {
  return { type: EDIT_ASSOCIATED, payload: dataAssociated };
}

export function dataUser(data) {
  return { type: GET_USER, payload: data };
}

export function getOwners(data) {
  return { type: GET_OWNERS, payload: data };
}

export function getConvenios(data) {
  return { type: GET_CONVENIOS, payload: data };
}

export function getAdmins(data) {
  return { type: GET_ADMINS, payload: data };
}

export function getOwner(owner) {
  return { type: GET_OWNER, payload: owner };
}

export function getId(id) {
  return { type: GET_ID, payload: id };
}

export function getDriver(driver) {
  return { type: GET_DRIVER, payload: driver };
}

export function earringCars(cars) {
  return { type: GET_EARRINGS_CARS, payload: cars };
}

export function getCar(car) {
  return { type: GET_CAR, payload: car };
}

export function pendings(pending) {
  let data = [];
  let pendingData = [];

  if (!pending) return { type: GET_PENDING, payload: null };

  return { type: GET_PENDING, payload: pending };
}

export function pendingData(pending) {
  let data = [];
  let pendingData = [];
  console.log(pending, "ACTIONS PENDING");
  if (!pending) return { type: GET_PENDING, payload: null };

  pendingData = pending.map((change) => {
    return {
      id: change['id'],
      name: change['name'],
      rut: change['rut'],
      changeName: change.changes.map((changeOne) => Object.keys(changeOne)[0]),
      old: change.changes.map(
        (changeTwo, index) => changeTwo[Object.keys(changeTwo)[0]]["old"]
      ),
      new: change.changes.map(
        (changeThree, index) => changeThree[Object.keys(changeThree)[0]]["new"]
      ),
    };
  });
  

  pendingData.forEach((key1, index) => {
    data.push(key1['id']);
    data.push(key1['name']);
    data.push(key1['rut']);
    key1["changeName"].forEach((key2, index2) => {
      data.push({
        changeName: key2,
        old: key1["old"][index2],
        new: key1["new"][index2],
      });
    });
  });
  console.log(data, 'DATAA');
  return { type: GET_PENDING_DATA, payload: data };
}
