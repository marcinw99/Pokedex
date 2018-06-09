import React, { Component } from "react";
import Tile from "./Tile";
import SearchOnePokemonForm from "./SearchOnePokemonForm";
import SearchMultiplePokemonsForm from "./SearchMultiplePokemonsForm";

class App extends Component {
  state = {
    listedPokemons: [],
    allPokemons: []
  };

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
    // Load names of all available pokemons into state
    this.P.getPokemonsList().then(
      result => {
        this.setState({
          allPokemons: result.results
        });
      },
      eror => {
        console.log(
          "Error downloading list of pokemons, application may not work properly :("
        );
      }
    );
  }

  fetchItemIntoState = (name, keepSearches) => {
    this.P.getPokemonByName(name).then(
      result => {
        if (keepSearches === false) {
          this.setState({
            listedPokemons: [result]
          });
        } else {
          // 1. Copy current state
          const pokemons = this.state.listedPokemons;
          // 2. Add pokemon to a state
          pokemons.push(result);
          // 3. Set state
          this.setState({
            listedPokemons: pokemons
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

  removePokemons = () => {
    this.setState({
      listedPokemons: []
    });
  };

  render() {
    return (
      <div className="App container my-4 p-3">
        <SearchOnePokemonForm
          fetchItemIntoState={this.fetchItemIntoState}
          removePokemons={this.removePokemons}
        />
        <SearchMultiplePokemonsForm
          fetchItemIntoState={this.fetchItemIntoState}
          allPokemons={this.state.allPokemons}
        />
        <div className="pokemons-list">
          {Object.keys(this.state.listedPokemons).map(key => (
            <Tile
              key={key}
              redirectToPokemonInfo={this.redirectToPokemonInfo}
              pokemon={this.state.listedPokemons[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
