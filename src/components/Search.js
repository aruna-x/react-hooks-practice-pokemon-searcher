import React from "react";

function Search({search, setSearch}) {
  console.log("search");
  
  function handleSearch(search){
    setSearch(search);
  }

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" value={search} onChange={(e)=>handleSearch(e.target.value)}/>
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
