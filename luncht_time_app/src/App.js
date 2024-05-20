import { Route, NavLink, HashRouter, Routes } from 'react-router-dom';
import './App.css';
import OrderList from './pages/OrderList';
import Order from './pages/Order';
import AddOrder from './pages/AddOrder';
import OrderAPI from './api/OrderApi';
import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import { Add } from '@mui/icons-material';

export const UserContext = React.createContext(null);

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#B81F40'
      }, secondary: {
        main: '#A6A6A'
      }
    }
  });
  const [user, setUser] = useState();
  
  OrderAPI.initDemoData();
  if (user === undefined) {
    setUser(OrderAPI.getUser(localStorage.getItem("CurrentUserId")));
  }

  return (
    <HashRouter>
      <Box className="App">
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <AppBar position='static' className='App-header' sx={{
              background: '#b81f40',
              color: 'white'
            }}>
              <Toolbar>
                <Button component={NavLink} to='/' >Bestellungen</Button>
                <IconButton component={NavLink} to='/order' ><Add/></IconButton>
              </Toolbar>
            </AppBar>
            <div className='App-content'>
              <Routes>
                <Route exact path='/' element={ <OrderList /> }/>
                <Route exact path='/order' element={ <Order /> }/>
                <Route exact path='/order/:id' Component={ Order }/>
                <Route exact path='/addorder/:orderid' Component={ AddOrder }/>
              </Routes>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
      </Box>
    </HashRouter>
  );
}

export default App;
