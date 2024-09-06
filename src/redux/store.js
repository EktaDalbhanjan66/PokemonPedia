// src/redux/store.js
import { createStore } from "redux";
import pokemonReducer from './reducer';

// Create the store with the reducer
const store = createStore(pokemonReducer);

export default store;
