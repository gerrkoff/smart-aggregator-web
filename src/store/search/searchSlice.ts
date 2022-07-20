import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH_STATUS } from '@types';

export type TInputState = {
  input: string;
  status: string;
};

const initialState: TInputState = {
  input: '',
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
    setInput: (state, action) => {
      state.input = action.payload.input;
    },
    setInputStatus: (state, action) => {
      state.status = action.payload.status;
    }
  }
});
