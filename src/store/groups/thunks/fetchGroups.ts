import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

export const fetchGroups = createAsyncThunk('chats/fetchChats', (_, { rejectWithValue }) =>
  api
    .chatList()
    .then(({ data }) => data)
    .catch((err) => rejectWithValue(err)),
);
