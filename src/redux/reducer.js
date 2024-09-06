
import { FETCH_DATA } from './actions';

 
const initialState = {
  pokemon: [],
};

// Reducer
const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        pokemon: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
