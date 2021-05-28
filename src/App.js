import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Components
import ProductList from './features/product/ProductList'
import EditProduct from './features/product/EditProduct'

// Custom styling
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CoinMena</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/edit-products/:id">
            <EditProduct />
          </Route>
          <Route exact path="/">
            <ProductList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
