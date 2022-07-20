import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TMessage } from '@types';
import { fetchMessages } from './thunks';

export type TMessagesState = {
  data?: TMessage[];
  requestStatus: RequestStatus;
};

const initialState: TMessagesState = {
  data: [],
  requestStatus: RequestStatus.INIT,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TMessagesState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchMessages.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchMessages.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.data = payload;
    });
  },
});
