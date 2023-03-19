import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '@/types';

export type TActivePost = {
  postId: number | string;
  requestStatus: RequestStatus;
};

const initialState: TActivePost = {
  postId: 0,
  requestStatus: RequestStatus.INIT,
};

export const activePostSlice = createSlice({
  initialState,
  name: 'activePost',
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload.postId;
    },
    setState: (state, action: PayloadAction<Partial<TActivePost>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setStatus: (state, action) => {
      state.requestStatus = action.payload.requestStatus;
    },
  },
});
