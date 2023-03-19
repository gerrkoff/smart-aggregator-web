import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TActiveGroupState = {
  groupId: number;
};

const initialState: TActiveGroupState = {
  groupId: 0,
};

export const activeGroupSlice = createSlice({
  initialState,
  name: 'activeGroup',
  reducers: {
    setGroupId: (state, action) => {
      state.groupId = action.payload.groupId;
    },
    setState: (state, action: PayloadAction<Partial<TActiveGroupState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});
