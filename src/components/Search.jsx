import React, { useState } from 'react';
import Scroll from './Scroll';

/**
 * @variable Serch
 */
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
/**
 * 
 * @param {*} e 
 */
  const handleChange = e => {
    setSearchField(e.target.value);
  };


  return (
    <section className="garamond">
      <div >
        <h2 className="f2 light-yellow">Busqueda del mapa</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb b--none bg-light-yellow ma3"
          type = "search" 
          placeholder = "¿A donde vas?" 
          onChange = {handleChange}
        />
      </div>
    </section>
  );
}

export default Search;