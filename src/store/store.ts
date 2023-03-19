import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { activeGroupSlice } from '@/store/activeGroup';
import { activePostSlice } from '@/store/activePost';
import { feedSlice } from '@/store/feed';
import { groupsSlice } from '@/store/groups';
import { postsSlice } from '@/store/posts/postsSlice';
import { searchSlice } from '@/store/search';

const reducer = combineReducers({
  activeGroup: activeGroupSlice.reducer,
  activePost: activePostSlice.reducer,
  feed: feedSlice.reducer,
  groups: groupsSlice.reducer,
  posts: postsSlice.reducer,
  search: searchSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
