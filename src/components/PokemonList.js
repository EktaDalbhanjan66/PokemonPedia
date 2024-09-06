// import React, { useState } from "react";
// import { useSelector ,useDispatch} from "react-redux";
// import Pagination from "./Pagination";
// import { setPage } from "../features/Pagination/paginationSlice";

// const PokemonList = ({ onSelect, selected }) => {

//   const dispatch = useDispatch();
//   const pokemons = useSelector((state) => state.pokemon);
//   const currentPage = useSelector((state) => state.pagination.page);
//   const itemsPerPage = useSelector((state) => state.pagination.limit);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Slice the Pokémon array to get the current page items
//   const currentPokemons = pokemons.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(pokemons.length / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       dispatch(setPage(currentPage + 1));
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       dispatch(setPage(currentPage - 1));
//     }
//   };

//   const handleSelectPokemon = (index) => {
//     const absoluteIndex = startIndex + index;

//     if (selected === absoluteIndex) {
//       let randomIndex = Math.floor(Math.random() * pokemons.length);
//       onSelect(randomIndex);
//       console.log('same index');
//     } else {
//       onSelect(absoluteIndex);
//       console.log('different index');
//     }
//   };

//   return (
//     <div className="mt-8">
//       <div className="grid grid-cols-1 md:grid-cols-10 sm:grid-cols-5 gap-4 mt-2">
//         {currentPokemons.map((pokemon, index) => {
//           const isSelected = selected === startIndex + index;
//           return (
//             <div
//               key={index}
//               className={`cursor-pointer text-center p-4 rounded-lg shadow-md transition-all duration-300 transform ${
//                 isSelected ? "bg-yellow-100 scale-120" : "bg-white"
//               } hover:scale-105`}
//               onClick={() => handleSelectPokemon(index)}
//             >
//               <img
//                 className="w-full h-32 object-contain mb-2 "
//                 src={pokemon.sprites.other["official-artwork"].front_default}
//                 alt={pokemon.name}
//               />
//               <p
//                 className={`text-sm font-medium ${
//                   isSelected ? "text-green-700" : "text-gray-900"
//                 }`}
//               >
//                 {pokemon.name}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onNext={handleNextPage}
//         onPrev={handlePrevPage}
//       />
//     </div>
//   );
// };

// export default PokemonList;
import React, { useState } from "react";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

const PokemonList = ({ onSelect, selected }) => {
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // You can change the default number of items per page

  const pokemons = useSelector((state) => state.pokemon);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the Pokémon array to get the current page items
  const currentPokemons = pokemons.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectPokemon = (index) => {
    const absoluteIndex = startIndex + index;

    if (selected === absoluteIndex) {
      let randomIndex = Math.floor(Math.random() * pokemons.length);
      onSelect(randomIndex);
      console.log("same index");
    } else {
      onSelect(absoluteIndex);
      console.log("different index");
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-10 sm:grid-cols-5 gap-4 mt-2 mr-2 ml-2">
        {currentPokemons.map((pokemon, index) => {
          const isSelected = selected === startIndex + index;
          return (
            <div
              key={index}
              className={`cursor-pointer text-center p-4 rounded-lg shadow-md transition-all duration-300 transform ${
                isSelected ? "bg-yellow-100 scale-120" : "bg-white"
              } hover:scale-105`}
              onClick={() => handleSelectPokemon(index)}
            >
              {isSelected && (
                <div className="absolute top-0 right-1 p-1">
                  <span className="text-red-500 font-bold text-lg">✕</span>
                </div>
              )}
              <img
                className="w-full h-32 object-contain mb-2 "
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
              <p
                // className={`text-sm font-medium ${
                //   isSelected ? "text-green-700" : "text-gray-900"
                // }`}
                className={`text-xs sm:text-sm md:text-base font-medium ${
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
