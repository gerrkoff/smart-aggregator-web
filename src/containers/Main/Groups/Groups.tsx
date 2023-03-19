import { FC, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ChatDto, useChats, useSearchChart } from '@/api';
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
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');
  const { data: founded } = useSearchChart(query ?? undefined, { enabled: !!query });
  const { data: chats } = useChats();
  const sorted = useMemo(() => sortGroups(query ? founded : chats), [chats, query, founded]);
  const selectedMessage = useSelectedMessage();
  const selectedChatId = selectedMessage?.chatId;

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>
        {sorted?.map((group) => (
          <Group key={group.id} group={group} selected={selectedChatId === group.id} />
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
