import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import { Group } from '@/components';

import { useGroupUrl } from './useGroupUrl';
import { useSelected } from './useSelected';

export const GroupPreview = memo(function GroupPreview() {
  const selected = useSelected();
  const url = useGroupUrl();

  if (!selected) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{selected.title}</title>
      </Helmet>

      <Group group={selected} showExternalLink url={url(selected.id)} />
    </>
  );
});
