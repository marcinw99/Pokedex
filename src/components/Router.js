import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Pokemon from "./Pokemon";
import AllPokemons from "./AllPokemons";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/pokemon/:pokemonName" component={Pokemon} />
      <Route path="/allpokemons" component={AllPokemons} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
