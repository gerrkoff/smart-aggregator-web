import { generatePath, useNavigate, useParams } from 'react-router-dom';

type UseGo = () => VoidFunction;

export const useGo: UseGo = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();

  return () => {
    const [pattern, params] = messageId ? ['/message/:messageId', { messageId }] : ['/', {}];
    navigate(generatePath(pattern, params));
  };
};
