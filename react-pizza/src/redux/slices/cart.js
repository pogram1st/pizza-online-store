import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const addPizzaToCart = createAsyncThunk('/cart/addPizzaToCart', async (pizzaObj) => {
  return pizzaObj;
});

export const clearCart = createAsyncThunk('/cart/clearCart', async () => {});

export const removeCartItem = createAsyncThunk('/cart/removeCartItem', async (id) => {
  return id;
});

export const plusCartItem = createAsyncThunk('/cart/plusCartItem', async (id) => {
  return id;
});

export const minusCartItem = createAsyncThunk('/cart/minusCartItem', async (id) => {
  return id;
});

export const cartUser = createAsyncThunk('/cart/cartUser', async (user) => {
  return user;
});

const getTotalPrice = (arr) => arr.reduce((price, item) => price + item.priceCart, 0);

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    // Add Cart Item
    [cartUser.fulfilled]: (state, action) => {
      console.log(action);
      // state.items = state.items;
      // state.totalPrice = state.totalPrice;
      // state.totalCount = state.totalCount;
    },
    [cartUser.rejected]: (state) => {
      state.items = state.items;
      state.totalPrice = state.totalPrice;
      state.totalCount = state.totalCount;
    },
    [addPizzaToCart.fulfilled]: async (state, action) => {
      const currentPizzaItems = !state.items[
        `${action.meta.arg.id}${action.meta.arg.sizePizza}${action.meta.arg.typesPizza}`
      ]
        ? [action.meta.arg]
        : [
            ...state.items[
              `${action.meta.arg.id}${action.meta.arg.sizePizza}${action.meta.arg.typesPizza}`
            ].items,
            action.meta.arg,
          ];
      const newItems = {
        ...state.items,
        [`${action.meta.arg.id}${action.meta.arg.sizePizza}${action.meta.arg.typesPizza}`]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.meta.arg.priceCart,
      };
    },
    [addPizzaToCart.rejected]: (state, action) => {
      state.err = 'error';
      state.action = action;
    },
    // Clear Cart Item
    [clearCart.fulfilled]: (state) => {
      return {
        ...initialState,
      };
    },
    // Remove Cart Item
    [removeCartItem.fulfilled]: (state, action) => {
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
    },
    // Plus
    [plusCartItem.fulfilled]: (state, action) => {
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
    },
    // Minus
    [minusCartItem.fulfilled]: (state, action) => {
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
    },
  },
});

export const cartReducer = cartSlice.reducer;
