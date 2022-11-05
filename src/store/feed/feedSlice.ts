import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TPost } from '@types';
import { fetchFeed } from './thunks';

export type TFeedState = {
  feed?: TPost[];
  requestStatus: RequestStatus;
};

const initialState: TFeedState = {
  feed: [],
  requestStatus: RequestStatus.INIT,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TFeedState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
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
});
