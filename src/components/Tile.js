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
        className="tile"
        style={photoCSS}
        onClick={() => {
          this.props.redirectToPokemonInfo(this);
        }}
      >
        <p>{name}</p>
      </div>
    );
  }
}

export default Tile;
