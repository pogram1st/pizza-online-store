const initalState = {
  items: {},
};

const cartId = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_ID': {
      if (state.items[action.payload]) {
        return {
          ...state,
          items: { ...state.items, [action.payload]: state.items[action.payload] + 1 },
        };
      } else {
        return { ...state, items: { ...state.items, [action.payload]: 1 } };
      }
    }
    case 'REMOVE_PIZZA_ID': {
      console.log(state.items[action.payload]);
      if (state.items[action.payload] > 1) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.payload]: state.items[action.payload] - 1,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'CLEAR_COUNT_PIZZA_ID': {
      return {
        ...state,
        items: { ...state.items, [action.payload]: 0 },
      };
    }
    case 'DELETE_ALL_PIZZAS_ID': {
      return {
        ...initalState,
      };
    }
    default:
      return state;
  }
};
export default cartId;
