import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Products from "./components/product/list";
import Edit from "./components/product/edit";
import { Header } from "./components/header";

// Custom styling
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/edit-products/:id" component={Edit} />
        <Route exact path="/" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
