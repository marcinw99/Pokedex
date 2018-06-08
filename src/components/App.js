import React, { Component } from "react";
import Tile from "./Tile";

class App extends Component {
  state = {
    pokemons: [],
    response: "noRequests",
    searchScope: {
      limit: 8,
      offset: 0
    }
  };
  formInput = React.createRef();
  keepSearches = React.createRef();

  componentDidMount() {
    const Pokedex = require("pokeapi-js-wrapper");
    const options = {
      protocol: "http",
      hostName: "pokeapi.salestock.net",
      versionPath: "/api/v2/",
      timeout: 120 * 1000,
      cache: true
    };
    this.P = new Pokedex.Pokedex(options);
  }

  searchForItem = event => {
    // Stop the form from submitting
    event.preventDefault();
    // Get value from input
    const pokemonName = this.formInput.current.value;
    // Check if should keep previous searches
    const keepSearches = this.keepSearches.current.checked;
    // Fetch Pokemon into state
    this.fetchItemIntoState(pokemonName, keepSearches);
  };

  fetchItemIntoState = (name, keepSearches) => {
    this.P.getPokemonByName(name).then(
      result => {
        if (keepSearches === false) {
          this.setState({
            pokemons: [result]
          });
        } else {
          // 1. Copy current state
          const pokemons = this.state.pokemons;
          // 2. Add pokemon to a state
          pokemons.push(result);
          // 3. Set state
          this.setState({
            pokemons: pokemons
          });
        }
      },
      error => {
        return null;
      }
    );
  };

  redirectToPokemonInfo = event => {
    const pokemon = event.props.pokemon.name;
    this.props.history.push(`/pokemon/${pokemon}`);
  };

  listPokemonsFromScope = () => {
    // remove previous pokemons
    this.setState({
      pokemons: []
    });
    this.P.getPokemonsList(this.state.searchScope).then(
      result => {
        const names = Object.keys(result.results).map(key => {
          return result.results[key].name;
        });
        names.forEach(name => {
          this.P.getPokemonByName(name).then(
            result => {
              // 1. Get a copy of state
              const pokemons = this.state.pokemons;
              // 2. Push new pokemon
              pokemons.push(result);
              // 3. Update state
              this.setState({
                pokemons
              });
            },
            error => {
              console.log(
                "Something went wrong when downloading pokemons from given scope"
              );
            }
          );
        });
      },
      error => {
        console.log(
          "Something went wrong when displaying pokemons from given scope"
        );
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
          <label>
            Keep previous searches
            <input
              type="checkbox"
              ref={this.keepSearches}
              name="keepSearches"
            />
          </label>
        </form>
        <button onClick={this.listPokemonsFromScope}>View all pokemons</button>
        <div className="pokemons-list">
          {Object.keys(this.state.pokemons).map(key => (
            <Tile
              key={key}
              redirectToPokemonInfo={this.redirectToPokemonInfo}
              pokemon={this.state.pokemons[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
