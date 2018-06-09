import React, { Component } from "react";

class Tile extends Component {
  render() {
    const name = this.props.pokemon.name;
    const background = this.props.pokemon.sprites.front_default;
    const photoCSS = {
      background: `url(${background})`,
      backgroundSize: "contain"
    };
    return (
      <div
        className="tile d-inline-block m-2"
        onClick={() => {
          this.props.redirectToPokemonInfo(this);
        }}
      >
        <div style={photoCSS} />
        <p className="font-weight-bold text-center">{name}</p>
      </div>
    );
  }
}

export default Tile;
