import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@api/baseAPI';

export const fetchFeed = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    return await baseAPI
      .getFeed()
      .then((data: []) => {
        return data;
      })
      .catch((err) => rejectWithValue(err.response.data));
  },
);
