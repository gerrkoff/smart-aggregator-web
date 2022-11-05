import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TPost } from '@types';

export type TPostsState = {
  posts: TPost[];
  requestStatus: RequestStatus;
};

const initialState: TPostsState = {
  posts: [],
  requestStatus: RequestStatus.INIT,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TPostsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setPosts: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    }
  }
});
