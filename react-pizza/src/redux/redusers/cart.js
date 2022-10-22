const initalState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
const getTotalPrice = (arr) => arr.reduce((price, item) => price + item.priceCart, 0);

const cart = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.priceCart,
      };
    }
    case 'CLEAR_CART': {
      return { ...initalState };
    }
    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount - currentTotalCount,
        totalPrice: state.totalPrice - currentTotalPrice,
      };
    }
    case 'PLUS_CART_ITEM': {
      const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + state.items[action.payload].items[0].priceCart,
      };
    }
    case 'MINUS_CART_ITEM': {
      const newItems =
        state.items[action.payload].items.length > 1
          ? state.items[action.payload].items.slice(1)
          : state.items[action.payload].items;
      const minusCount =
        state.items[action.payload].items.length > 1 ? state.totalCount - 1 : state.totalCount;
      const minusPrice =
        state.items[action.payload].items.length > 1
          ? state.totalPrice - state.items[action.payload].items[0].priceCart
          : state.totalPrice;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalPrice: minusPrice,
        totalCount: minusCount,
      };
    }
    default:
      return state;
  }
};

export default cart;
