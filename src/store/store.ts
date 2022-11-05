import thunkMiddleware from 'redux-thunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { feedSlice } from '@store/feed';
import { groupsSlice } from '@store/groups';
import { postsSlice } from '@store/posts/postsSlice';
import { activePostSlice } from '@store/activePost';
import { activeGroupSlice } from '@store/activeGroup';
import { searchSlice } from '@store/search';

const reducer = combineReducers({
  feed: feedSlice.reducer,
  groups: groupsSlice.reducer,
  posts: postsSlice.reducer,
  activePost: activePostSlice.reducer,
  activeGroup: activeGroupSlice.reducer,
  search: searchSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
