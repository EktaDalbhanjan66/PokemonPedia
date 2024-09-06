import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  fetchPokemonDetails,
} from "../features/Pokemon/pokemonSlice";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";
import { showLoading, hideLoading } from "../features/Loader/loaderSlice";
import Loader from "./Loader";
import {
  fetchPokemonList,
  fetchPokemonDetails as fetchDetailsFromAPI,
} from "../api/api"; // Import API functions

const MainPokemon = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(-1); // Initially no selection
  const [isLoading, setIsLoading] = useState(false);
  const loadPokemons = async () => {
    setIsLoading(true);
    try {
      // Fetch Pokémon list
      const pokemonList = await fetchPokemonList();
      console.log(pokemonList);
      dispatch(fetchData(pokemonList)); // Store names and URLs in state

      // Select a random Pokémon once the list is fetched
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemonUrl = pokemonList[randomIndex].url;

      // Fetch the details for the random Pokémon
      loadPokemonDetails(randomPokemonUrl, randomIndex);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
     setIsLoading(false);
    }
  };

  const loadPokemonDetails = async (url, index) => {
    try {
      // Fetch Pokémon details
      const details = await fetchDetailsFromAPI(url);
      console.log(details);
      dispatch(fetchPokemonDetails(details)); // Store details in state
      setSelected(index); // Set the selected Pokémon
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  useEffect(() => {
    loadPokemons(); // Fetch Pokémon on component mount
  }, []);
  const pokemons = useSelector((state) => state.pokemon.pokemon);
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <div className="bg-orange-300 w-full p-4">
        <h1 className="text-3xl font-bold text-center">Pokemon Pedia</h1>
      </div>
      <div className="flex-grow overflow-y-auto w-full bg-orange-300">
        {isLoading && <Loader />}
        {/* Only show selected Pokémon details here */}
        {pokemons && selected !== -1 && (
          <PokemonDetails pokemon={pokemons[selected]} />
        )}
        {pokemons && <PokemonList onSelect={setSelected} selected={selected} />}
      </div>
    </div>
  );
};

export default MainPokemon;
