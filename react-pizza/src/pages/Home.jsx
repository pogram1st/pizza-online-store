import React from 'react';
import Catigories from '../components/Catigories';
import { PizzaBlock } from '../components/PizzaBlock';
import { SortPopap } from '../components/SortPopap';

function Home({ catigories, setCatigories, clickOnCatigories, pizzas }) {
  return (
    <div className='container'>
      <div className='content__top'>
        <Catigories
          catigories={catigories}
          setCatigories={setCatigories}
          clickOnCatigories={clickOnCatigories}
          items={['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые']}
        />
        <SortPopap
          items={[
            { name: 'популярности', type: 'popular' },
            { name: 'цене', type: 'price' },
            { name: 'алфавиту', type: 'alphabet' },
          ]}
          pizzas={pizzas}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {pizzas.map((item) => (
          <PizzaBlock key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
