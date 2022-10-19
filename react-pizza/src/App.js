import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';

import { setPizzas } from './redux/actions/pizzas';

function App() {
  const [catigories, setCatigories] = React.useState(0);

  //Redux
  const dispatch = useDispatch();
  const { items } = useSelector(({ filters, pizzas }) => {
    return {
      items: pizzas.items,
      filters: filters,
    };
  });

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => dispatch(setPizzas(data.pizzas)));
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route
            path='/'
            element={<Home pizzas={items} catigories={catigories} setCatigories={setCatigories} />}
            exact
          />
          <Route path='/cart' element={<Cart />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
