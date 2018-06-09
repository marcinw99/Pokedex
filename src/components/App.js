import React, { Component } from "react";
import Tile from "./Tile";
import SearchOnePokemonForm from "./SearchOnePokemonForm";
import SearchMultiplePokemonsForm from "./SearchMultiplePokemonsForm";

class App extends Component {
  state = {
    listedPokemons: [],
    allPokemons: [],
    waitingForDataAbout: []
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
    // Don't make more then 12 requests at one time
    // If there is already a request for that item don't send more
    if (
      this.state.waitingForDataAbout.length >= 12 ||
      this.state.waitingForDataAbout.indexOf(name) !== -1
    ) {
      return false;
    }
    // Update info about current ajax requests for pokemons
    const waitingForDataAbout = this.state.waitingForDataAbout;
    if (waitingForDataAbout.indexOf(name) === -1) {
      waitingForDataAbout.push(name);
    }
    console.log(waitingForDataAbout);
    this.setState({
      waitingForDataAbout
    });
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
        // Update info about current ajax requests for pokemons
        const waitingForDataAbout = this.state.waitingForDataAbout;
        const indexOfItem = waitingForDataAbout.indexOf(name);
        waitingForDataAbout.splice(indexOfItem, 1);
        this.setState({
          waitingForDataAbout
        });
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
      <div className="App container mb-5 p-3">
        <h1>Search for specific pokemon by name</h1>
        <SearchOnePokemonForm fetchItemIntoState={this.fetchItemIntoState} />
        <h1>Search Pokepedia</h1>
        <SearchMultiplePokemonsForm
          fetchItemIntoState={this.fetchItemIntoState}
          allPokemons={this.state.allPokemons}
          removePokemons={this.removePokemons}
        />
        <div className="waiting-for-list">
          <p className="d-inline-block font-weight-bold mx-2 my-3">
            Waiting for data about:
          </p>
          {Object.keys(this.state.waitingForDataAbout).map(key => (
            <div className="waiting-for-item green-rounded-box d-inline-block m-1">
              {this.state.waitingForDataAbout[key]}
            </div>
          ))}
        </div>
        <h1>Results</h1>
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
