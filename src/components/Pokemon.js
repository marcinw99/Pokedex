import React, { Component } from "react";

class Pokemon extends Component {
  state = {
    response: "wait",
    pokemon: {}
  };

  fetchPokemonDataIntoState = name => {
    this.P.getPokemonByName(name).then(
      result => {
        this.setState({
          response: "success",
          pokemon: result
        });
      },
      error => {
        this.setState({
          response: "error"
        });
      }
    );
  };

  componentDidMount() {
    // 1. Get pokemon's name from props
    const name = this.props.match.params.pokemonName;
    // 2. Set up Pokeapi wrapper
    const Pokedex = require("pokeapi-js-wrapper");
    const options = {
      protocol: "http",
      hostName: "pokeapi.salestock.net",
      versionPath: "/api/v2/",
      cache: true
    };
    this.P = new Pokedex.Pokedex(options);
    // 3. Fetch Pokemon's data
    this.fetchPokemonDataIntoState(name);
  }

  render() {
    switch (this.state.response) {
      case "wait":
        return <p>Downloading pokeData, please wait...</p>;
      case "error":
        return (
          <p>Given pokemon does not exist or API does not respond, sorry :/</p>
        );
      case "success":
        return (
          <div>
            <p>{this.state.pokemon.name}</p>
          </div>
        );
      default:
        return <p>Well, that was not expected</p>;
    }
  }
}

export default Pokemon;
