import React, { Component } from "react";

class SearchOnePokemonForm extends Component {
  formInput = React.createRef();
  keepSearches = React.createRef();

  searchForSpecificPokemon = event => {
    // Stop the form from submitting
    event.preventDefault();
    // Get value from input
    const pokemonName = this.formInput.current.value;
    // Check if should keep previous searches
    const keepSearches = this.keepSearches.current.checked;
    // Fetch Pokemon into state
    this.props.fetchItemIntoState(pokemonName, keepSearches);
  };

  render() {
    return (
      <form
        className="search-one-pokemon-form"
        onSubmit={this.searchForSpecificPokemon}
      >
        <input
          type="text"
          ref={this.formInput}
          required
          placeholder="Enter name"
          defaultValue="bulbasaur"
          id="pokemon-name-input"
        />
        <button type="submit">Find it!</button>
        <label>
          Keep previous searches
          <input
            type="checkbox"
            ref={this.keepSearches}
            name="keepSearches"
            id="keep-searches"
          />
        </label>
      </form>
    );
  }
}

export default SearchOnePokemonForm;
