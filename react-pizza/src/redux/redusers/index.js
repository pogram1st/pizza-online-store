import { combineReducers } from 'redux';
import filtersReducer from './filters';
import pizzasReducer from './pizzas';

const rootReduser = combineReducers({ filters: filtersReducer, pizzas: pizzasReducer });

export default rootReduser;
