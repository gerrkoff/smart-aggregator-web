import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TFeed } from '@types';

export type TFeedsState = {
  posts: TFeed[];
  requestStatus: RequestStatus;
};

const initialState: TFeedsState = {
  posts: [],
  requestStatus: RequestStatus.INIT,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TFeedsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setPosts: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
});
