import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchMultiplePokemonsForm extends Component {
  state = {
    maxRangeValue: 1,
    rangeValue: 1,
    startValue: 0
  };
  rangeStartInput = React.createRef();
  amountInput = React.createRef();

  componentDidUpdate() {
    if (
      this.props.allPokemons.length !== 0 &&
      this.state.maxRangeValue !== this.props.allPokemons.length
    ) {
      this.setState({
        maxRangeValue: this.props.allPokemons.length
      });
    }
  }

  listPokemonsFromScope = event => {
    // Prevent default
    event.preventDefault();
    // Check if all pokemons list is available
    if (this.props.allPokemons === undefined) {
      console.log("All pokemons list is not available");
      return false;
    }
    // Get pokemons names from indicated scope
    const startValue = +this.rangeStartInput.current.value,
      endValue = +startValue + +this.amountInput.current.value;
    const pokemonsFromScope = this.props.allPokemons
      .slice(startValue, endValue)
      .map(key => {
        return key.name;
      });
    // Fetch every pokemon into state
    pokemonsFromScope.forEach(name => {
      this.props.fetchItemIntoState(name, true);
    });
  };
  handleChange = event => {
    if (event.currentTarget.name === "startValue") {
      this.setState({
        startValue: event.currentTarget.value
      });
    } else if (event.currentTarget.name === "rangeValue") {
      this.setState({
        rangeValue: event.currentTarget.value
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form
          className="search-pokemons-from-scope-form"
          onSubmit={this.listPokemonsFromScope}
        >
          <p className="font-weight-bold">Set scope start and range: </p>
          <input
            type="range"
            className="range-input"
            name="startValue"
            ref={this.rangeStartInput}
            min="0"
            max={this.state.maxRangeValue}
            step="1"
            defaultValue="0"
            onChange={this.handleChange}
          />
          <p className="scope-display d-inline-block mx-2">
            <span>
              <span>{this.state.startValue}</span>-
              <span>{+this.state.startValue + +this.state.rangeValue}</span>
            </span>
          </p>
          <input
            type="number"
            className="mx-2"
            name="rangeValue"
            ref={this.amountInput}
            min="1"
            max="12"
            defaultValue="1"
            onChange={this.handleChange}
          />
          <button className="green-rounded-box mx-2" type="submit">
            Search for pokemons
          </button>
        </form>
        <button
          className="green-rounded-box remove-pokemons-btn mx-2 my-2"
          type="button"
          onClick={this.props.removePokemons}
        >
          Remove pokemons from the table
        </button>
      </React.Fragment>
    );
  }
}

SearchMultiplePokemonsForm.propTypes = {
  amountInput: PropTypes.number,
  rangeStartInput: PropTypes.number
};

export default SearchMultiplePokemonsForm;
