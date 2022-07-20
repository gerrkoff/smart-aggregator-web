import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@api/baseAPI';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    return await baseAPI
      .getMessages()
      .then((data: []) => {
        return data
      })
      .catch((err) => rejectWithValue(err.response.data));
  },
);
