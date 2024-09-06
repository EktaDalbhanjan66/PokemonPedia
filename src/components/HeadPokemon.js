import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/actions";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";
// import { hideLoading, showLoading } from "../features/Loader/loaderSlice";
import Loader from "./Loader";

const url = "https://pokeapi.co/api/v2/pokemon";

const HeadPokemon = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [isApiError,setIsApiError]=useState(false);
  
//   const page = useSelector((state) => state.pagination.page);
  

  const fetchPokemons = async () => {
    setIsLoading(true);
    setIsApiError(false); 
    try {
      setSelected(-1);

      const pokemons = await axios.get(
        `${url}?limit=150`
      );

      const promises = pokemons.data.results.map(async (pokemon) => {
        const details = await axios.get(`${url}/${pokemon.name}`);
        return { name: pokemon.name, ...details.data };
      });

      const results = await Promise.all(promises);
      dispatch(fetchData(results));

      const randomIndex = Math.floor(Math.random() * results.length);
      setSelected(randomIndex);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setIsApiError(true);
    } finally {
      setIsLoading(false);

    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const pokemons = useSelector((state) => state.pokemon);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <div className="bg-orange-300 w-full p-4">
        <h1 className="text-3xl font-bold text-center">Pokemon Pedia</h1>
      </div>
      <div className="flex-grow overflow-y-auto w-full bg-orange-300">
        {isLoading && <Loader/> }
        {isApiError && (
          <div className="text-center mt-8 text-red-500">
            API is on maintenance mode. Please try again later.
          </div>
        )}
        {!isApiError && pokemons && selected !== -1 && (
          <PokemonDetails pokemon={pokemons[selected]} />
        )}
        {isLoading && <Loader/>}
        {!isApiError && pokemons && <PokemonList onSelect={setSelected} selected={selected} />}
      </div>
    </div>
  );
};

export default HeadPokemon;
