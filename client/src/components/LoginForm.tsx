import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { useStores } from '../store';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {networkStore} = useStores();

  return (
    <div>
      <input
        onChange={ (e) => setEmail(e.target.value) }
        value={ email }
        type="text"
        placeholder="Email"
      />
      <input
        onChange={ (e) => setPassword(e.target.value) }
        value={ password }
        type="password"
        placeholder="Пароль"
      />
      <button onClick={ () => networkStore.login(email, password) }>Логин</button>
      <button onClick={ () => networkStore.registration(email, password) }>Регистрация</button>
    </div>
  );
};

export default observer(LoginForm);
