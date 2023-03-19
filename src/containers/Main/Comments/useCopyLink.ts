import { useEffect, useRef, useState } from 'react';

type UseCopyLink = () => [boolean, VoidFunction];

export const useCopyLink: UseCopyLink = () => {
  const [state, setState] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef(false);

  const handler = () => {
    setState(true);

    timer.current = setTimeout(() => {
      if (!ref.current) {
        setState(false);
      }
    }, 1500);
  };

  useEffect(
    () => () => {
      ref.current = true;
    },
    [],
  );

  return [state, handler];
};
