import React, { useEffect, useState } from 'react';
import { Group, GroupPreview } from '@components';
import { getGroupLastTime } from '@utils/utils';
import { activeGroupSlice } from '@store/activeGroup';
import { useAppDispatch } from '@store/hooks';
import { TGroup } from '@types';

import styles from './Groups.module.scss';

const DataToGroups = ({ data, handleGroupClick }) => {
  const [groups, setGroups] = useState(data)

  useEffect(() => {
    const sortedGroups = sortGroups([...data])
    setGroups(sortedGroups);
  }, [data])

  const sortGroups = (array) => {
    return array.sort((a: TGroup, b: TGroup) => getGroupLastTime(b) - getGroupLastTime(a))
  }

  return (
    <>{groups.map(group => <Group group={group} handleClick={handleGroupClick} key={group.id}/>)}</>
  )
}

export const Groups = ({ data }) => {
  const [groups, setGroups] = useState(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setGroups(data)
  }, [data])

  const handleGroupClick = (e) => {
    const id = e.currentTarget.dataset.groupId;
    dispatch(activeGroupSlice.actions.setGroupId({ groupId: id }))
  }

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>
        <DataToGroups data={groups} handleGroupClick={handleGroupClick}/>
      </div>
      <div className={styles.info__wrapper}>
        <div className={styles.groups__preview}>
          <GroupPreview data={groups}/>
        </div>
      </div>
    </div>
  )
}
