import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy, setCategory } from '../redux/slices/filters';
import { Catigories, PizzaBlock, LoadingPizza, SortPopap } from '../components';
import { addPizzaToCart } from '../redux/slices/cart';
import { fetchNamePizzas, fetchPizzas, fetchPricePizzas } from '../redux/slices/pizzas';
import { addPizzasId } from '../redux/slices/countPizzas';
const categoryNames = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPizzas({ category, sortBy }));
  }, []);
  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), []);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  let items = useSelector(({ pizzas }) => pizzas.items);
  items = category === 0 ? items : items.filter((obj) => obj.category === category);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const cartItems = useSelector(({ cart }) => cart.items);
  const addedPizzaId = useSelector(({ countPizzasId }) => countPizzasId.items);
  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };
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
