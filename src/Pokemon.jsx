import { useEffect } from "react";
import "./index.css";

const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);
  return (
    <div>
      <h1>Hello pokemon</h1>
    </div>
  );
};

export default Pokemon;
