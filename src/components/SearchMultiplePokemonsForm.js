import React, { Component } from "react";

class SearchMultiplePokemonsForm extends Component {
  render() {
    return (
      <form
        className="search-pokemons-from-scope-form"
        onSubmit={this.props.listPokemonsFromScope}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          name="scope"
          id="scope-pointer"
        />
        <input type="number" name="amount" min="0" max="12" defaultValue="4" />
        <button type="submit">Search for pokemons</button>
      </form>
    );
  }
}

export default SearchMultiplePokemonsForm;
