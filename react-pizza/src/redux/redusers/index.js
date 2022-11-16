import { combineReducers } from 'redux';
import filters from './filters';
import pizzas from './pizzas';
import cart from './cart';
import { auth } from './auth';
import countPizzasId from './countPizzasId';

const rootReduser = combineReducers({
  filters,
  pizzas,
  cart,
  auth,
  countPizzasId,
});

export default rootReduser;
