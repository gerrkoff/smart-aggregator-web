import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

export const fetchFeed = createAsyncThunk('messages/fetchMessages', (_, { rejectWithValue }) => {
  return api
    .messageFeedList()
    .then(({ data }) => data)
    .catch(({ error }) => rejectWithValue(error));
});
