import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@api/baseAPI';

export const fetchFeed = createAsyncThunk(
  'messages/fetchMessages',
  (_, { rejectWithValue }) => {
    return baseAPI
      .getFeeds()
      .then((data: []) => {
        return data;
      })
      .catch((err) => rejectWithValue(err.response.data));
  },
);
