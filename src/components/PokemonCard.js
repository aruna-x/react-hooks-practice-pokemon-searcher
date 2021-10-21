import React, {useState} from "react";
import { Card } from "semantic-ui-react";

function PokemonCard({front, back, name, hp}) {
  const [clicked, setClicked] = useState(true);
  function handleClick(){
    setClicked(!clicked);
  }

  return (
    <Card>
      <div onClick={handleClick}>
        <div className="image">
          <img src={clicked ? front : back} alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {hp}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PokemonCard;
