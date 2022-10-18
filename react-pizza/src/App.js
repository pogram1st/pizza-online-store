import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';

import { setPizzas as setPizzasAction } from './redux/actions/pizzas';

function App(props) {
  console.log(props);
  const [catigories, setCatigories] = React.useState(0);
  const clickOnCatigories = (obj) => {
    console.log(obj);
  };

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => props.setPizzas(data.pizzas));
    //axios.get('http://localhost:3000/db.json').then(({ data }) => props.dispatch(setPizzasAction(data.pizzas)));
    // Запись если не использовать mapDispatchToProps в connect redux
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
                pizzas={props.items}
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

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPizzas: (items) => dispatch(setPizzasAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
