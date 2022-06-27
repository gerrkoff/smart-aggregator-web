import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TChat } from '@types';
import { fetchChats } from './thunks';

export type TChatsState = {
  data?: TChat[];
  requestStatus: RequestStatus;
};

const initialState: TChatsState = {
  data: [],
  requestStatus: RequestStatus.INIT,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TChatsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchChats.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchChats.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.data = payload;
    });
  },
});
