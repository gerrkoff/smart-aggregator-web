import { FC, HTMLAttributes } from 'react';

import styles from './Input.module.css';

export type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'className' | 'type' | 'value'> & {
  value: string;
};

export const Input: FC<InputProps> = ({ value, ...props }) => {
  return <input {...props} type="text" className={styles.input} value={value} />;
};
