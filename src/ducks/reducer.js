import axios from 'axios';

const initalState = {
  houses: [],
  favoriteHouses: [],
  listedHouses: [],
  user: {},
};

const GET_HOUSES = 'GET_HOUSES';
const GET_FAVORITES = 'GET_FAVORITES';
const GET_LISTED = 'GET_LISTED';
const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case `${GET_HOUSES}_FULFILLED`:
      return Object.assign({}, state, { houses: action.payload });
    case `${GET_FAVORITES}_FULFILLED`:
      return Object.assign({}, state, { favoriteHouses: action.payload });
    case `${GET_LISTED}_FULFILLED`:
      return Object.assign({}, state, { listedHouses: action.payload });
    case GET_USER:
      return Object.assign({}, state, { user: action.payload });
    case LOG_OUT:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}

export function getHouses() {
  return {
    type: GET_HOUSES,
    payload: axios.get('/api/properties').then(houses => houses.data),
  };
}

export function getFavorites() {
  return {
    type: GET_FAVORITES,
    payload: axios.get('/api/favoritesid').then(favorites => favorites.data),
  };
}

export function favoriteHouse(houseId) {
  return {
    type: GET_FAVORITES,
    payload: axios.post(`/api/favorites/${houseId}`).then(favHouses => favHouses.data),
  };
}

export function unfavoriteHouse(houseId) {
  console.log(houseId);
  return {
    type: GET_FAVORITES,
    payload: axios.post(`/api/favorites/${houseId}`).then(favHouses => favHouses.data),
  };
}

export function getListed() {
  return {
    type: GET_LISTED,
    payload: axios.get('/listed').then(listedHouses => listedHouses.data),
  };
}

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: {},
  };
}
