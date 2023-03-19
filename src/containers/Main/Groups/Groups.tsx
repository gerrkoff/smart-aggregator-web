import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatDto, useChats } from '@/api';
import { Group } from '@/components';
import { useSelectedMessage } from '@/hooks';
import { getGroupLastTime } from '@/utils/utils';

import { GroupPreview } from './GroupPreview';

import styles from './Groups.module.scss';

const sortGroups = (arr: ChatDto[] = []) =>
  arr.sort((a: ChatDto, b: ChatDto) => getGroupLastTime(b) - getGroupLastTime(a));

export type GroupsProps = { noPreview?: boolean };

export const Groups: FC<GroupsProps> = ({ noPreview }) => {
  const { chatId } = useParams();
  const { data: groups } = useChats();
  const sorted = useMemo(() => sortGroups(groups), [groups]);
  const selectedMessage = useSelectedMessage();
  const selectedChatId = selectedMessage?.chatId;

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>
        {sorted?.map((group) => (
          <Group group={group} key={group.id} selected={selectedChatId === group.id} />
        ))}
      </div>

      {chatId && !noPreview ? (
        <div className={styles.info__wrapper}>
          <div className={styles.groups__preview}>
            <GroupPreview />
          </div>
        </div>
      ) : null}
    </div>
  );
};
