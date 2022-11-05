import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TActiveGroupState = {
  groupId: number;
};

const initialState: TActiveGroupState = {
  groupId: 0,
};

export const activeGroupSlice = createSlice({
  name: 'activeGroup',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TActiveGroupState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setGroupId: (state, action) => {
      state.groupId = action.payload.groupId;
    }
  }
});
