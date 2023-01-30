import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@api/baseAPI';

export const fetchGroups = createAsyncThunk(
  'chats/fetchChats',
  (_, { rejectWithValue }) => {
    return baseAPI
      .getGroups()
      .then((data: []) => {
        return data;
      })
      .catch((err) => rejectWithValue(err.response.data));
  },
);
