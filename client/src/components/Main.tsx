import { useStores } from '../store';
import { IUser } from '../models/IUser';

const Main = () => {
  const {networkStore} = useStores();

  return <>
    <h1>Main Page</h1>
    <h1>
      { networkStore.isAuth
        ? `Пользователь авторизован ${ networkStore.user.email }`
        : 'АВТОРИЗУЙТЕСЬ!' }
    </h1>
    <h2>
      {
        networkStore.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОТВЕРДИТЕ АККАУНТ'
      }
    </h2>
    <button onClick={ () => networkStore.logout() }>Выйти</button>
    <div>
      { networkStore.users.map((user: IUser) => {
        return <div key={ user._id }>{ user._id } { user.email }</div>;
      }) }
    </div>
  </>;
};

export default Main;
