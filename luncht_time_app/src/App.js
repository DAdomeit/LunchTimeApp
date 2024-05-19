import { Route, NavLink, HashRouter, Routes } from 'react-router-dom';
import './App.css';
import OrderList from './pages/OrderList';
import Order from './pages/Order';
import AddOrder from './pages/AddOrder';
import OrderAPI from './api/OrderApi';
import React, { useState } from 'react';

export const UserContext = React.createContext(null);

function App() {
  OrderAPI.initDemoData();
  const [user, setUser] = useState();
  if (user === undefined) {
    setUser(OrderAPI.getUser(localStorage.getItem("CurrentUserId")));
  }

  return (
    <HashRouter>
      <div className="App">
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <header className="App-header">
            <ul className="header">
              <li><NavLink to="/">Bestellungen</NavLink></li>
              <li><NavLink to="/order">Neue Bestellung</NavLink></li>
            </ul>
          </header>
          <div className='App-content'>
            <Routes>
              <Route exact path='/' element={ <OrderList /> }/>
              <Route exact path='/order' element={ <Order /> }/>
              <Route exact path='/order/:id' Component={ Order }/>
              <Route exact path='/addorder/:orderid' Component={ AddOrder }/>
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
