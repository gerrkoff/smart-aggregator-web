import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TActivePost = {
  postId: number | string;
};

const initialState: TActivePost = {
  postId: 0,
};

export const activePostSlice = createSlice({
  name: 'activePost',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TActivePost>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setPostId: (state, action) => {
      state.postId = action.payload.postId;
    },
  }
});
