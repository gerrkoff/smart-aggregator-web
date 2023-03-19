import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageDto } from '@/api';
import { RequestStatus } from '@/types';

export type TPostsState = {
  posts: MessageDto[];
  requestStatus: RequestStatus;
};

const initialState: TPostsState = {
  posts: [],
  requestStatus: RequestStatus.INIT,
};

export const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    setPosts: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setState: (state, action: PayloadAction<Partial<TPostsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
});
