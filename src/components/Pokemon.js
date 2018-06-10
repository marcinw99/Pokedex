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
        return (
          <p className="request-info p-5 text-center font-weight-bold">
            Downloading pokeData, please wait...
          </p>
        );
      case "error":
        return (
          <p className="request-info p-5 text-center font-weight-bold">
            Given pokemon does not exist or API does not respond, sorry :/
          </p>
        );
      case "success":
        const name = this.state.pokemon.name,
          background = this.state.pokemon.sprites.front_default,
          photoCSS = {
            background: `url(${background})`,
            backgroundSize: "contain"
          },
          height = this.state.pokemon.height,
          weight = this.state.pokemon.weight,
          base_exp = this.state.pokemon.base_experience,
          abilities = this.state.pokemon.abilities,
          types = this.state.pokemon.types
            .map(key => {
              return key.type.name;
            })
            .join(", "),
          stats = this.state.pokemon.stats,
          moves = this.state.pokemon.moves;
        return (
          <div className="Pokemon container mb-5 py-3 px-4">
            <div className="row">
              <div className="col-6 avatar" style={photoCSS} />
              <div className="col-6 basic-info p-2">
                <h1>{name}</h1>
                <p>{types}</p>
                <div>
                  <p>Height: {height}</p>
                  <p>Weight: {weight}</p>
                  <p>Base experience: {base_exp}</p>
                  <h3>Abilities</h3>
                  <ul>
                    {abilities.map(key => (
                      <li key={key.ability.name}>{key.ability.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="stats">
              {stats.map(key => (
                <div key={key.stat.url}>
                  <span>
                    <p key={key.stat.name}>{key.stat.name}</p>
                    <br />
                    <p key={key.base_stat}>{key.base_stat}</p>
                  </span>
                </div>
              ))}
            </div>
            <h1>Moves</h1>
            <div className="moves p-3">
              {moves.map(key => (
                <span key={key.move.name}>{key.move.name}, </span>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <p className="request-info p-5 text-center font-weight-bold">
            Well, that was not expected
          </p>
        );
    }
  }
}

export default Pokemon;
