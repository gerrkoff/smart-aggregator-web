import { forwardRef, HTMLAttributes } from 'react';

import styles from './Input.module.css';

export type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'className' | 'type'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
  return <input {...props} ref={ref} className={styles.input} type="text" />;
});
