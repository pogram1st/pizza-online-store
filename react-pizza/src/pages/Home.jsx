import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Catigories,
  PizzaBlock,
  LoadingPizza,
  SortPopap,
  setCategory,
  setSortBy,
  fetchPizzas,
  addPizzaToCart,
} from '../components';

const categoryNames = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), [dispatch]);

  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  const onClickSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
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
                onClickAddPizza={handleAddPizzaToCart}
                addedCount={cartItems[item.id] && cartItems[item.id].items.length}
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
