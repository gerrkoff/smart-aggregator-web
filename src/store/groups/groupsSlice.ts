import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatDto } from '@/api';
import { RequestStatus } from '@/types';

import { fetchGroups } from './thunks';

export type TChatsState = {
  groups?: ChatDto[];
  requestStatus: RequestStatus;
};

const initialState: TChatsState = {
  groups: [],
  requestStatus: RequestStatus.INIT,
};

export const groupsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchGroups.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchGroups.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.groups = payload;
    });
  },
  initialState,
  name: 'groups',
  reducers: {
    setGroups: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setState: (state, action: PayloadAction<Partial<TChatsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});
