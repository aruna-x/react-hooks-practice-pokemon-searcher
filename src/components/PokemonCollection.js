import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({displayedPokemon}) {
  console.log("PokemonC");
  const pokemonCardsList = displayedPokemon.map((pokemon)=><PokemonCard key={pokemon.id} front={pokemon.sprites.front} back={pokemon.sprites.back} name={pokemon.name} hp={pokemon.hp}/>)
  
  return (
    <Card.Group itemsPerRow={6}>
      {pokemonCardsList}
    </Card.Group>
  );
}

export default PokemonCollection;
