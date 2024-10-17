import { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";
import PaginationSec from "./PaginationSec";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const API = "https://pokeapi.co/api/v2/pokemon?limit=256";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const currentPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className='flex items-center justify-center space-x-8'>
        <div className='w-6 h-6 rounded-full animate-pulse bg-green-500'></div>
        <div className='w-6 h-6 rounded-full animate-pulse bg-green-500'></div>
        <div className='w-6 h-6 rounded-full animate-pulse bg-green-500'></div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className='my-6'>Hello Pokémon</h1>
      <div className='pokemon-search'>
        <input
          type='text'
          placeholder='Search Pokémon.....'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className='cards'>
          {currentPokemon.map((carPokemon) => {
            return <PokemonCard key={carPokemon.id} pokemonData={carPokemon} />;
          })}
        </ul>
      </div>

      <PaginationSec
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Pokemon;
