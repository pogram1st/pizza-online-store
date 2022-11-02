export { default as Catigories } from '../components/Catigories';
export { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
export { default as LoadingPizza } from '../components/PizzaBlock/LoadingPizza';
export { SortPopap } from '../components/SortPopap';
export { setCategory } from '../redux/actions/filters';
export { setSortBy } from '../redux/actions/filters';
export { fetchPizzas } from '../redux/actions/pizzas';
export {
  addPizzaToCart,
  clearCart,
  removeCartItem,
  plusCartItem,
  minusCartItem,
} from '../redux/actions/cart';
export {
  addPizzasId,
  removePizzaId,
  clearCountPizzaId,
  deleteAllPizzasId,
} from '../redux/actions/countPizzasId';
export { default as CartItem } from '../components/CartItem';
