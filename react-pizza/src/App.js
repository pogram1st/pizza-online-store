import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';

function App() {
  const [catigories, setCatigories] = React.useState(0);
  const clickOnCatigories = (obj) => {
    console.log(obj);
  };
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                clickOnCatigories={clickOnCatigories}
                catigories={catigories}
                setCatigories={setCatigories}
              />
            }
            exact
          />
          <Route path='/cart' element={<Cart />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
