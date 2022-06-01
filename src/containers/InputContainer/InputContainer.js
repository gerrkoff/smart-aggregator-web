import styles from './InputContainer.module.scss';
import { Button, Input } from '../../components';

export const InputContainer = `
  <div class=${ styles.input }>
      ${Input('Поиск', 'input')}
      ${Button('Поиск', 'input-button')}
  </div>
`
