import axios from 'axios';

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
  axios
    .get(`/pizzas?${category > 0 ? `category=${category}&` : ''}_sort=${sortBy}&_order=asc`)
    .then(({ data }) => {
      const timeout = new Promise(() => setTimeout(() => dispatch(setPizzas(data)), 1000));
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
