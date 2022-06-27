import thunkMiddleware from 'redux-thunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { messagesSlice } from '@store/messages';
import { chatsSlice } from '@store/chats';
import { activeChatSlice } from '@store/activeChat/activeChatSlice';
import { activeMessageSlice } from '@store/activeMessage';
import { searchSlice } from '@store/search';

const reducer = combineReducers({
  messages: messagesSlice.reducer,
  chats: chatsSlice.reducer,
  activeChat: activeChatSlice.reducer,
  activeMessage: activeMessageSlice.reducer,
  search: searchSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
