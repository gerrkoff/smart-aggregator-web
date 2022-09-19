import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TMessage } from '@types';

export type TMessagesState = {
  chatMessagesData: TMessage[];
  requestStatus: RequestStatus;
};

const initialState: TMessagesState = {
  chatMessagesData: [],
  requestStatus: RequestStatus.INIT,
};

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TMessagesState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setMessages: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    }
  }
});
