import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../axios';

export const addPizzasId = createAsyncThunk('/countPizza/addPizzasId', async (params) => {
  return params;
});

export const deleteAllPizzasId = createAsyncThunk('/countPizza/deleteAllPizzasId', async () => {});

export const removePizzaId = createAsyncThunk('/countPizza/removePizzaId', async (params) => {
  return params;
});

export const clearCountPizzaId = createAsyncThunk(
  '/countPizza/clearCountPizzaId',
  async (params) => {
    return params;
  },
);

const initialState = {
  items: {},
};

const countPizzasSlice = createSlice({
  name: 'countPizza',
  initialState,
  reducers: {},
  extraReducers: {
    //add
    [addPizzasId.fulfilled]: (state, action) => {
      if (state.items[action.payload]) {
        return {
          ...state,
          items: { ...state.items, [action.payload]: state.items[action.payload] + 1 },
        };
      } else {
        return { ...state, items: { ...state.items, [action.payload]: 1 } };
      }
    },
    [addPizzasId.rejected]: (state) => {
      state.items = {};
    },
    //deleteAllPizza
    [deleteAllPizzasId.fulfilled]: (state) => {
      return {
        ...initialState,
      };
    },
    [deleteAllPizzasId.rejected]: (state) => {
      state.err = 'error';
    },
    //remove
    [removePizzaId.fulfilled]: (state, action) => {
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
    },
    //clearCountPizza
    [clearCountPizzaId.fulfilled]: (state, action) => {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.chId]: state.items[action.payload.chId] - [action.payload.coutPizzas],
        },
      };
    },
  },
});

export const countReducer = countPizzasSlice.reducer;
