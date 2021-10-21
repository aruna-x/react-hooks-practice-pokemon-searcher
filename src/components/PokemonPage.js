import React, {useEffect, useState} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [originalPokemon, setOriginalPokemon] = useState([]);
  // const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    fetch('http://localhost:3001/pokemon')
      .then(r=>r.json())
      .then(data => {
        setOriginalPokemon(data);
        // setDisplayedPokemon(data);
      });
  }, []);

  const newPokemon = originalPokemon.filter(pokemon => pokemon.name.includes(search));

  // React lessons:

  // put state in lowest possible component and lift only when needed

  // EXPLANATION: when the state of PokemonPage changes (when a new search query is entered)
  // this parent component re-renders. Child components will only update the DOM when props are new though.
  // We do not need to use "useEffect" with a dependency array with search in it to re-render this component.
  // And if we just store our new array in "newPokemon" and pass it to a child component, then that
  // child component will also re-render with that new info. This ALSO gets rid of the need for the
  // "displayedPokemon" useState, which was acting as an expensive container for what is now newPokemon.

  // useEffect(()=>{
  //   const newPokemon = originalPokemon.filter(pokemon => pokemon.name.includes(search));
  //   setDisplayedPokemon(newPokemon);
  // }, [search]);

  function submitNewPokemon(newPokemon){

    //post new pokemon to the db for persistence
    fetch('http://localhost:3001/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
      .then(r=>console.log(r.json()))
      .then(()=>{
        //dynamically update pokemon on the page
        const newOriginalPokemon = [newPokemon, ...originalPokemon];
        // setDisplayedPokemon(newOriginalPokemon);
        setOriginalPokemon(newOriginalPokemon);
        //clear search query so that the page now shows entire list
        setSearch("");
      });
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm submitNewPokemon={submitNewPokemon} />
      <br />
      <Search search={search} setSearch={setSearch}/>
      <br />
      <PokemonCollection displayedPokemon={newPokemon}/>
    </Container>
  );
}

export default PokemonPage;
