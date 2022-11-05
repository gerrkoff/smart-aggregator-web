import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH_STATUS } from '@types';

export type TInputState = {
  search: string;
  status: string;
};

const initialState: TInputState = {
  search: '',
  status: SEARCH_STATUS.default
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TInputState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setSearch: (state, action) => {
      state.search = action.payload.search;
    },
    setInputStatus: (state, action) => {
      state.status = action.payload.status;
    }
  }
});
