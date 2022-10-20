import axios from 'axios';

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
  axios
    .get(
      `http://localhost:3001/pizzas?${
        category > 0 ? `category=${category}&` : ''
      }_sort=${sortBy}&_order=asc`,
    )
    .then(({ data }) => {
      Promise(() => setTimeout(() => dispatch(setPizzas(data)), 1000));
    });
};

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});
export const setLoading = (isLoaded) => ({
  type: 'SET_LOADING',
  payload: isLoaded,
});
