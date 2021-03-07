import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact render={() => <Home />} />
        <Route path="/login" exact render={() => <Login />} />
      </Switch>
    </BrowserRouter>
  );
}
