const initalState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initalState, action) => {
  console.log(state);
  if (action.type === 'SET_PIZZAS') {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};
export default pizzas;
