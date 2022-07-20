import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TActiveMessageState = {
  messageId: number | string;
};

const initialState: TActiveMessageState = {
  messageId: 0,
};

export const activeMessageSlice = createSlice({
  name: 'activeMessage',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TActiveMessageState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setMessageId: (state, action) => {
      state.messageId = action.payload.messageId;
    },
  }
});
