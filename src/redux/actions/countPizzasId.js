export const addPizzasId = (id) => ({
  type: 'ADD_PIZZA_ID',
  payload: id,
});
export const removePizzaId = (id) => ({
  type: 'REMOVE_PIZZA_ID',
  payload: id,
});
export const clearCountPizzaId = (id, coutPizzas) => ({
  type: 'CLEAR_COUNT_PIZZA_ID',
  payload: { id, coutPizzas },
});
export const deleteAllPizzasId = (id) => ({
  type: 'DELETE_ALL_PIZZAS_ID',
});
