import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TGroup } from '@types';
import { fetchGroups } from './thunks';

export type TChatsState = {
  groups?: TGroup[];
  requestStatus: RequestStatus;
};

const initialState: TChatsState = {
  groups: [],
  requestStatus: RequestStatus.INIT,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TChatsState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setGroups: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
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
});
