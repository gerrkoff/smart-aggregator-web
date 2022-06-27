import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@api/baseAPI';

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async (_, { rejectWithValue }) => {
    return await baseAPI
      .getChats()
      .then((data: []) => {
        return data
      })
      .catch((err) => rejectWithValue(err.response.data));
  },
);
