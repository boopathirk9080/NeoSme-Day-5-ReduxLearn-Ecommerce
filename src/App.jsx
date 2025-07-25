import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router";
import Category from './components/Category'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails';
import Cart from './components/cart/Cart';
import { Provider } from 'react-redux';
import { store } from './components/store/store';



if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]))
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <NavBar />
        
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </BrowserRouter>

    </Provider>
  )
}

export default App