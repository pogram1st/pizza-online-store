import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setSortBy = createAsyncThunk('/filter/setSortBy', async (params) => {
  const data = params;
  return data;
});

export const setCategory = createAsyncThunk('/filter/setCategory', async (params) => {
  const data = params;
  return data;
});

const initialState = {
  sortBy: 'rating',
  category: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: {
    [setSortBy.pending]: (state) => {
      state.sortBy = 'rating';
    },
    [setSortBy.fulfilled]: (state, action) => {
      state.sortBy = action.payload;
    },
    [setSortBy.rejected]: (state) => {
      state.data = 'rating';
    },
    [setCategory.pending]: (state) => {},
    [setCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
    [setCategory.rejected]: (state) => {},
  },
});

export const filterReducer = filterSlice.reducer;
