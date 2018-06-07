import React, { Component } from "react";
import Tile from "./Tile";

class App extends Component {
  state = {
    pokemons: []
  };
  formInput = React.createRef();

  componentDidMount() {
    const Pokedex = require("pokeapi-js-wrapper");
    const options = {
      protocol: "http",
      hostName: "pokeapi.salestock.net",
      versionPath: "/api/v2/",
      cache: true
    };
    this.P = new Pokedex.Pokedex(options);
  }

  searchForItem = event => {
    // Stop the form from submitting
    event.preventDefault();
    // Get value from input
    const pokemonName = this.formInput.current.value;
    // Fetch Pokemon
    this.fetchItemIntoState(pokemonName);
    // If exists, change URL to /pokemon/pokemonName, else, display "NotFound"
    // this.props.history.push(`/pokemon/${pokemonName}`);
  };

  fetchItemIntoState = name => {
    this.P.getPokemonByName(name).then(
      result => {
        console.log(result);
        this.setState({
          pokemons: [result]
        });
      },
      error => {
        return null;
      }
    );
  };

  render() {
    return (
      <div className="App">
        <form className="search-form" onSubmit={this.searchForItem}>
          <input
            type="text"
            ref={this.formInput}
            required
            placeholder="Enter name"
            defaultValue="bulbasaur"
          />
          <button type="submit">Find it!</button>
        </form>
        <div className="pokemons-list">
          {Object.keys(this.state.pokemons).map(key => (
            <Tile key={key} pokemon={this.state.pokemons[key]} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
