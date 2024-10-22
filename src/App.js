import React from 'react';
import LoginPages from './pages/LoginPages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'devextreme/dist/css/dx.light.css';

import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import ProductsLists from './pages/ProductsLists';
import './assets/css/index.css';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/loginPages" element={<LoginPages />} />
          <Route path="/users" element={<Users />} />
          <Route path="/*" element={<LoginPages />} />
          <Route path="/userEdit" element={<UserEdit />} />
          <Route path="/productsLists" element={<ProductsLists />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
