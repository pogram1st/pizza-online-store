// import { createStore, compose, applyMiddleware } from 'redux';
// import rootReduser from './redusers';
// import thunk from 'redux-thunk';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)));

// window.store = store;

// export default store;
import { configureStore } from '@reduxjs/toolkit';
// import { postsReducer } from './slices/pizzas';
import { authReducer } from './slices/auth';
import { filterReducer } from './slices/filters';
import { pizzaReducer } from './slices/pizzas';
import { countReducer } from './slices/countPizzas';
import { cartReducer } from './slices/cart';
const store = configureStore({
  reducer: {
    auth: authReducer,
    pizzas: pizzaReducer,
    filters: filterReducer,
    countPizzasId: countReducer,
    cart: cartReducer,
  },
});
export default store;
