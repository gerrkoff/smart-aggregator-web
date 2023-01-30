import React, { useEffect, useState } from 'react';
import { searchSlice, useSearchSelector } from '@store/search';
import { useAppDispatch } from '@store/hooks';
import { activeGroupSlice } from '@store/activeGroup';
import { SEARCH_STATUS } from '@types';

export const withSearch = (Component) => {
  return function (dataApi) {
    const [data, setData] = useState(dataApi);
    const { search } = useSearchSelector();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (search) {
        const dataWithSearch = data?.filter((chat) =>
          chat.description.toLowerCase().includes(search),
        );

        if (dataWithSearch.length > 0) {
          setData(dataWithSearch);
          dispatch(activeGroupSlice.actions.setGroupId({ chatId: 0 }));
        } else {
          dispatch(
            searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.error }),
          );
          dispatch(activeGroupSlice.actions.setGroupId({ chatId: 0 }));
          setData([]);
        }
      } else {
        setData(dataApi);
      }
    }, [search, dataApi]);

    return <Component data={data} />;
  };
};
