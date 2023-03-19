import { useSearchParams } from 'react-router-dom';

type useClear = (ref: React.RefObject<HTMLInputElement>) => VoidFunction;

export const useClear: useClear = (ref) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return () => {
    if (ref.current) {
      // меняем значение value неконтролируемого компонента
      // eslint-disable-next-line no-param-reassign
      ref.current.value = '';
    }

    if (searchParams.get('search')) {
      const updated = new URLSearchParams(searchParams);
      updated.delete('search');
      setSearchParams(updated);
    }
  };
};
