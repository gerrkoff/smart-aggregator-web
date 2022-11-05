import React, { useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import { Group } from '@components';
import { TGroup } from '@types';

export const GroupPreview = ({ data }) => {
  const [activeGroup, setActiveGroup] = useState();
  const { groupId } = useActiveGroupSelector();

  useEffect(() => {
    const group = data.find((group: TGroup) => String(group.id) === String(groupId));
    setActiveGroup(group)
  }, [groupId])

  return activeGroup ? <Group group={activeGroup}/> : null
}
