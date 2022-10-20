import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const PizzaBlock = ({
  types,
  imgUrl,
  name,
  sizes,
  id,
  price,
  onClickAddPizza,
  addedCount,
}) => {
  const aviableTypes = ['тонкое', 'традиционное'];
  const aviableSizes = [26, 30, 40];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSizes, setActiveSizes] = React.useState(aviableSizes.indexOf(sizes[0]));
  const clickTypesPizza = (index) => {
    setActiveType(index);
  };
  const clickSizesPizza = (index) => {
    setActiveSizes(index);
  };

  const onAddPizza = () => {
    const priceCart = price[activeSizes];
    const typesPizza = aviableTypes[activeType];
    const sizePizza = aviableSizes[activeSizes];
    const obj = {
      id,
      name,
      imgUrl,
      priceCart,
      typesPizza,
      sizePizza,
      size: activeSizes,
      type: activeType,
    };
    onClickAddPizza(obj);
  };

  return (
    <div key={id} className='pizza-block'>
      {/* <Sceleton /> */}
      <img className='pizza-block__image' src={imgUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{name}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {aviableTypes.map((item, index) => (
            <li
              key={index}
              onClick={() => clickTypesPizza(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}
            >
              {item}
            </li>
          ))}
        </ul>
        <ul>
          {aviableSizes.map((item, index) => (
            <li
              key={index}
              onClick={() => clickSizesPizza(index)}
              className={classNames({
                active: activeSizes === index,
                disabled: !sizes.includes(item),
              })}
            >
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price[activeSizes]} ₽</div>
        <div onClick={onAddPizza} className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  imgUrl: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  price: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

PizzaBlock.defaultProps = {
  name: '',
  types: [],
  price: [],
  sizes: [],
  isLoading: false,
};
