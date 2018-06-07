import React, { Component } from "react";

class Tile extends Component {
  render() {
    const name = this.props.pokemon.name;
    const height = this.props.pokemon.height;
    const exp = this.props.pokemon.base_experience;
    return (
      <div className="tile">
        <p>Name: {name}</p>
        <p>Height: {height}</p>
        <p>Base experience: {exp}</p>
      </div>
    );
  }
}

export default Tile;
