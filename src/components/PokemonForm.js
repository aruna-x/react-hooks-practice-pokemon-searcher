import React, {useState} from "react";
import { Form } from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import PokemonCard from "./PokemonCard";

const resetFormData = {
  name: "",
  hp: "",
  sprites: {
    front: "",
    back: ""
  },
  id: ""
};

function PokemonForm({submitNewPokemon, }) {
  console.log("PokemonForm");
  const [formData, setFormData] = useState(resetFormData);

  function handleChange(key, value) {
    const frontBool = key==="front";
    const backBool = key==="back";
    const formKey = frontBool || backBool ? "sprites" : key;
    let formValue;
    switch (true){
      case frontBool:
        formValue = {
          front: value,
          back: formData.sprites.back
        }
        break;
      case backBool:
        formValue = {
          front: formData.sprites.front,
          back: value
        }
        break;
      default:
        formValue = value;
        break;
    }
    setFormData({...formData, [formKey] : formValue})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPokemon = {
      name: formData.name,
      hp: formData.hp,
      sprites: {
        front: formData.sprites.front,
        back: formData.sprites.back
      },
      id: uuid()
    };
    submitNewPokemon(newPokemon);
    setFormData(resetFormData);
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" value={formData.name} onChange={(e)=>{handleChange("name", e.target.value);}}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" value={formData.hp} onChange={(e)=>{handleChange("hp", e.target.value);}}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="front"
            value={formData.sprites.front}
            onChange={(e)=>{handleChange("front", e.target.value);}}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="back"
            value={formData.sprites.back}
            onChange={(e)=>{handleChange("back", e.target.value);}}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
