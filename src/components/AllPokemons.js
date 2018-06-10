import React, { Component } from "react";
import { Pokedex } from "../pokeapi-js-wrapper/index";

class AllPokemons extends Component {
  state = {
    allPokemonsNamesAndUrls: []
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
    // Load divs - links with pokemons names into state
    this.P.getPokemonsList().then(
      result => {
        this.setState({
          allPokemonsNamesAndUrls: result.results
        });
      },
      eror => {
        console.log(
          "Error downloading list of pokemons, application may not work properly :("
        );
      }
    );
  }

  redirectToPokemonInfo = event => {
    this.props.history.push(`/pokemon/${event.target.textContent}`);
  };

  render() {
    return (
      <div className="all-pokemons-list container mb-5 p-3">
        {Object.keys(this.state.allPokemonsNamesAndUrls).map(key => (
          <div
            className="green-rounded-box font-weight-bold d-inline-block m-1"
            key={key}
            onClick={this.redirectToPokemonInfo}
          >
            {this.state.allPokemonsNamesAndUrls[key].name}
          </div>
        ))}
      </div>
    );
  }
}

export default AllPokemons;
