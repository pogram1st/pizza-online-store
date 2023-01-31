import axios from 'axios';

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
  axios
    .get(`/pizzas?${category > 0 ? `category=${category}&` : ''}_sort=${sortBy}&_order=asc`)
    .then(({ data }) => {
      dispatch(setPizzas(data));
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
