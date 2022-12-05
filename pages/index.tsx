import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Header, Search, Main } from '@containers';
import { store } from '@store/store';
import { baseAPI } from '@api/baseAPI';
import { useAppDispatch } from '@store/hooks';
import { feedSlice } from '@store/feed';
import { groupsSlice } from '@store/groups';

function Index({ groups, feed }) {
  return (
    <Provider store={store}>
      <AppWrapper groups={groups} feed={feed}/>
    </Provider>
  );
}

const AppWrapper = ({ groups, feed }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feedSlice.actions.setFeed({ feed }));
    dispatch(groupsSlice.actions.setGroups({ groups }));
  }, [])

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header/>
        <Search/>
        <Main groups={groups} feed={feed}/>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const feed = await baseAPI.getFeed()
  const groups = await baseAPI.getGroups()

  return {
    props: { groups, feed }, // will be passed to the page component as props
  }
}

export default Index;
