const initalState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };

      const pizzasCount = [].concat.apply([], Object.values(newItems)).length;
      const cartItemsPrice = [].concat
        .apply([], Object.values(newItems))
        .reduce((price, item) => price + item.priceCart, 0);

      return {
        ...state,
        items: newItems,
        totalCount: pizzasCount,
        totalPrice: cartItemsPrice,
      };
    }
    default:
      return state;
  }
};

export default cart;
