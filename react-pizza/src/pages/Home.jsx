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
} from '../components';

const categoryNames = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), []);
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onClickSortType = (type) => {
    dispatch(setSortBy(type));
  };

  // http://localhost:3001/pizzas?_sort=name&_order=asc  Сортировка по названию по возрастанию буквы
  // http://localhost:3001/pizzas?_sort=name&_order=desc  Сортировка по названию по убыванию буквы
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
          ? items.map((item) => <PizzaBlock key={item.id} {...item} />)
          : Array(12)
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
