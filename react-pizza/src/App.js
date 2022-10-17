import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [catigories, setCatigories] = React.useState(0);
  const clickOnCatigories = (obj) => {
    console.log(obj);
  };
  React.useEffect(() => {
    // fetch('http://localhost:3000/db.json')
    // .then(data => (data.json()))
    // .then(data => setPizzas(data.pizzas))
    axios.get('http://localhost:3000/db.json').then(({ data }) => setPizzas(data.pizzas));
  }, []);
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                pizzas={pizzas}
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
