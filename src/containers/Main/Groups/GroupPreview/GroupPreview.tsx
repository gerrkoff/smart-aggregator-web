import { memo } from 'react';

import { Group } from '@/components';

import { useSelected } from './useSelected';

export const GroupPreview = memo(function GroupPreview() {
  const selected = useSelected();

  return selected ? <Group group={selected} showExternalLink /> : null;
});
