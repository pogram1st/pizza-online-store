import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy, setCategory } from '../redux/slices/filters';
import { Catigories, PizzaBlock, LoadingPizza, SortPopap } from '../components';
import { addPizzaToCart, fetchCart, fetchCartItemsDB } from '../redux/slices/cart';
import { fetchPizzas } from '../redux/slices/pizzas';
import { selectIsAuth } from '../redux/slices/auth';
import { addPizzasId } from '../redux/slices/countPizzas';
const categoryNames = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), []);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  let items = useSelector(({ pizzas }) => pizzas.items);
  items = category === 0 ? items : items.filter((obj) => obj.category === category);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  let cartItems = useSelector(({ cart }) => cart.items);
  let cart = useSelector(({ cart }) => cart);
  const authCart = (cartItems = useSelector(({ auth }) => auth.data));
  console.log(cart);
  const addedPizzaId = useSelector(({ countPizzasId }) => countPizzasId.items);
  const handleAddPizzaToCart = async (obj) => {
    await dispatch(addPizzaToCart(obj));
    // if (window.localStorage.getItem('token')) {
    //   await dispatch(fetchCartItemsDB( cart ));
    // }
  };
  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchCartItemsDB({ cart: cart }));
    }
  }, [cart, isAuth]);
  const onClickSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);
  React.useEffect(() => {
    dispatch(fetchPizzas({ category, sortBy }));
  }, [category, sortBy]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Catigories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopap activeSortType={sortBy} items={sortItems} onClickSortType={onClickSortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoaded
          ? items.map((item) => (
              <PizzaBlock
                key={item.id}
                {...item}
                cartItems={cartItems}
                onClickAddPizza={handleAddPizzaToCart}
                addedPizzaId={addedPizzaId}
                dispatch={dispatch}
                addedCount={addedPizzaId[item.id] ? addedPizzaId[item.id] : 0}
              />
            ))
          : Array(8)
              .fill(0)
              .map((item, index) => (
                <div key={item + index} className='pizza-block'>
                  <LoadingPizza />
                </div>
              ))}
      </div>
    </div>
  );
}

export default Home;
