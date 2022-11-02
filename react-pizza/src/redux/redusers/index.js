import { combineReducers } from 'redux';
import filters from './filters';
import pizzas from './pizzas';
import cart from './cart';
import countPizzasId from './countPizzasId';

const rootReduser = combineReducers({
  filters,
  pizzas,
  cart,
  countPizzasId,
});

export default rootReduser;
