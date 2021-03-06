import React, { Component } from "react";
import Tile from "./Tile";
import SearchOnePokemonForm from "./SearchOnePokemonForm";
import SearchMultiplePokemonsForm from "./SearchMultiplePokemonsForm";
import { Pokedex } from "../pokeapi-js-wrapper/index";

class App extends Component {
  state = {
    listedPokemons: [],
    allPokemons: [],
    waitingForDataAbout: []
  };

  componentDidMount() {
    const options = {
      protocol: "http",
      hostName: "pokeapi.salestock.net",
      versionPath: "/api/v2/",
      timeout: 120 * 1000,
      cache: true
    };
    this.P = new Pokedex(options);
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

  addItemToWaitingForList = name => {
    const waitingForDataAbout = this.state.waitingForDataAbout;
    if (waitingForDataAbout.indexOf(name) === -1) {
      waitingForDataAbout.push(name);
    }
    this.setState({
      waitingForDataAbout
    });
  };

  removeItemFromWaitingForList = name => {
    const waitingForDataAbout = this.state.waitingForDataAbout;
    const indexOfItem = waitingForDataAbout.indexOf(name);
    waitingForDataAbout.splice(indexOfItem, 1);
    this.setState({
      waitingForDataAbout
    });
  };

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
    this.addItemToWaitingForList(name);

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
        this.removeItemFromWaitingForList(name);
      },
      error => {
        this.removeItemFromWaitingForList(name);
        alert(`Could not find find ${name} in the database :(`);
        return null;
      }
    );
  };

  redirectToPokemonInfo = event => {
    const pokemon = event.props.pokemon.name;
    this.props.history.push(`/pokemon/${pokemon}`);
  };

  redirectToAllPokemonsList = () => {
    this.props.history.push(`/allpokemons`);
  };

  removePokemons = () => {
    this.setState({
      listedPokemons: []
    });
  };

  render() {
    return (
      <div className="App container mb-5 mt-1 p-3">
        <button
          className="green-rounded-box"
          onClick={this.redirectToAllPokemonsList}
        >
          View all pokemons names
        </button>
        <h1 className="mx-2">Search for specific pokemon by name</h1>
        <SearchOnePokemonForm fetchItemIntoState={this.fetchItemIntoState} />
        <h1 className="mx-2 mt-2">Search Pokepedia</h1>
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
            <div
              key={key}
              className="waiting-for-item green-rounded-box d-inline-block m-1"
            >
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
