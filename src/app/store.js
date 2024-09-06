import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/Pokemon/pokemonSlice";
import paginationReducer from "../features/Pagination/paginationSlice";
import loaderReducer from "../features/Loader/loaderSlice"

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pagination: paginationReducer,
    loader:loaderReducer
  },
});
