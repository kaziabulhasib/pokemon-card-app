import { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=356";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center space-x-8'>
        <div className='w-6 h-6 rounded-full animate-pulse  bg-violet-600'></div>
        <div className='w-6 h-6 rounded-full animate-pulse  bg-violet-600'></div>
        <div className='w-6 h-6 rounded-full animate-pulse  bg-violet-600'></div>
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
      <h1 className='my-6'>Hello pokemon</h1>
      <div className='pokemon-search'>
        <input
          type='text'
          placeholder='Search Pokemon.....'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className='cards'>
          {searchData.map((carPokemon) => {
            return <PokemonCard key={carPokemon.id} pokemonData={carPokemon} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Pokemon;
