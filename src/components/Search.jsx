import React, { useState } from 'react';
import Scroll from './Scroll';


function Search({ details }) {

  const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };


  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow ">
        <h2 className="f2 light-yellow">Busqueda del mapa</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-light-yellow ma3"
          type = "search" 
          placeholder = "¿A donde vas?" 
          onChange = {handleChange}
        />
      </div>
    </section>
  );
}

export default Search;