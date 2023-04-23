import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatDto, useChats, useSearchChart } from '@/api';
import { Group } from '@/components';
import { getGroupLastTime } from '@/utils';

import { GroupPreview, useGroupUrl } from './GroupPreview';

import styles from './Groups.module.scss';

const sortGroups = (arr: ChatDto[] = []) =>
  arr.sort((a: ChatDto, b: ChatDto) => getGroupLastTime(b) - getGroupLastTime(a));

export type GroupsProps = { noPreview?: boolean };

export const Groups: FC<GroupsProps> = ({ noPreview }) => {
  const { chatId, search: query } = useParams();
  const { data: founded } = useSearchChart(query ?? undefined, { enabled: !!query });
  const { data: chats } = useChats({ enabled: !query });
  const sorted = useMemo(() => sortGroups(query ? founded : chats), [chats, query, founded]);
  const url = useGroupUrl();

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>
        {sorted?.map((group) => (
          <Group key={group.id} group={group} selected={!!chatId && Number(chatId) === group.id} url={url(group.id)} />
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
