import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import { setPage } from "../features/Pagination/paginationSlice";
import axios from "axios";

const PokemonList = ({ onSelect, selected }) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemon); // List of Pokemon from Redux
  const currentPage = useSelector((state) => state.pagination.page);
  const itemsPerPage = useSelector((state) => state.pagination.limit);

  const [pokemonImages, setPokemonImages] = useState({}); // Store images in an object

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the Pokémon array to get the current page items
  const currentPokemons = pokemons.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(setPage(currentPage - 1));
    }
  };

  // Function to fetch Pokémon images based on their URL
  const fetchPokemonImages = async (pokemons) => {
    const imagePromises = pokemons.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: response.data.sprites.other["official-artwork"].front_default,
      };
    });

    const images = await Promise.all(imagePromises);

    // Create an object mapping each Pokemon name to its image
    const imageMap = {};
    images.forEach((item) => {
      imageMap[item.name] = item.image;
    });

    setPokemonImages(imageMap); // Store the images in state
  };

  useEffect(() => {
    // Fetch images when the component is mounted
    if (currentPokemons.length > 0) {
      fetchPokemonImages(currentPokemons);
    }
  }, [currentPokemons]); // Effect runs when currentPokemons changes

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-10 sm:grid-cols-5 gap-4 mt-2">
        {currentPokemons.map((pokemon, index) => {
          const isSelected = selected === startIndex + index;
          const image = pokemonImages[pokemon.name]; // Get the image from the fetched images

          return (
            <div
              key={index}
              className={`cursor-pointer text-center p-4 rounded-lg shadow-md transition-all duration-300 transform ${
                isSelected ? "bg-yellow-100 scale-120" : "bg-white"
              } hover:scale-105`}
              onClick={() => onSelect(startIndex + index)} // Select the Pokemon
            >
              {image ? (
                <img
                  className="w-full h-32 object-contain mb-2"
                  src={image}
                  alt={pokemon.name}
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                  Loading...
                </div>
              )}
              <p
                className={`text-sm font-medium ${
                  isSelected ? "text-green-700" : "text-gray-900"
                }`}
              >
                {pokemon.name}
              </p>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </div>
  );
};

export default PokemonList;
