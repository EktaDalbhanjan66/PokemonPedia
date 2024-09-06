import React from "react";

const PokemonDetails = ({ pokemon }) => {
  const { name, base_experience, height, weight, moves, abilities, stats } =
    pokemon;
  const image = pokemon.sprites.other["official-artwork"].front_default;

  const displayedMoves = moves.slice(0, 7);

  return (
    <div>
      <div className=" mx-auto  shadow-md overflow-hidden p-6  bg-yellow-200 w-full">
        <div className="flex  justify-evenly ">
          {/* Left Side */}
          <div className="w-1/3 flex flex-col  justify-evenly items-center">
            <p className="text-lg text-gray-700">Height: {height} decimetres</p>
            <p className="mt-2 text-lg text-gray-700">
              Weight: {weight} hectograms
            </p>
            <p className="mt-2 text-lg text-gray-700">
              Base Experience: {base_experience}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 text-center">
                Moves
              </h3>
              <div className="flex justify-center flex-wrap gap-2 mt-2">
                {displayedMoves.map((moveObj, index) => (
                  <span
                    key={index}
                    className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    {moveObj.move.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="w-1/3 text-center">
            <img
              className="mx-auto h-64 w-64 object-contain"
              src={image}
              alt={name}
            />
            <div className="uppercase tracking-wide text-lg  text-black font-extrabold mt-2">
              {name}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/3">
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Abilities</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {abilities.map((abilityObj, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    {abilityObj.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Stats</h3>
              <div className="space-y-2 mt-2">
                {stats.slice(0, 3).map((statObj, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-gray-700 w-32">
                      {statObj.stat.name}:
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-4 ml-2">
                      <div
                        className="bg-orange-500 h-4 rounded-full"
                        // style={{ width: `${statObj.base_stat}%` }}
                        style={{ width: `${Math.min(statObj.base_stat, 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-700">
                      {statObj.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
