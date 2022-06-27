import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TActiveChatState = {
  chatId: number | string;
};

const initialState: TActiveChatState = {
  chatId: 0,
};

export const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TActiveChatState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setChatId: (state, action) => {
      state.chatId = action.payload.chatId;
    }
  }
});
