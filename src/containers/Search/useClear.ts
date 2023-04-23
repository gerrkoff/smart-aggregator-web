import { useGo } from './useGo';

type useClear = (ref: React.RefObject<HTMLInputElement>) => VoidFunction;

export const useClear: useClear = (ref) => {
  const go = useGo();

  return () => {
    if (ref.current) {
      // меняем значение value неконтролируемого компонента
      // eslint-disable-next-line no-param-reassign
      ref.current.value = '';
    }

    go();
  };
};
