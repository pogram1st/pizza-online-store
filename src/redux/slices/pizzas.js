import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPizzas = createAsyncThunk('/pizza/fetchPizzas', async (params) => {
  const { data } = await axios.post('/pizzas', params);
  return data;
});

const initialState = {
  items: [],
  isLoaded: false,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.isLoaded = false;
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    [fetchPizzas.rejected]: (state) => {
      state.data = [];
      state.isLoaded = false;
    },
  },
});

export const pizzaReducer = pizzasSlice.reducer;
