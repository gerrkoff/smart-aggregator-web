import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageDto } from '@/api';
import { RequestStatus } from '@/types';

import { fetchFeed } from './thunks';

export type TFeedState = {
  feed?: MessageDto[];
  requestStatus: RequestStatus;
};

const initialState: TFeedState = {
  feed: [],
  requestStatus: RequestStatus.INIT,
};

export const feedSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchFeed.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchFeed.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.feed = payload;
    });
  },
  initialState,
  name: 'feed',
  reducers: {
    setFeed: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setState: (state, action: PayloadAction<Partial<TFeedState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});
