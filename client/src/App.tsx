import { observer } from 'mobx-react-lite';
import Routes from './Routes';

const App = observer(() => {
  return (
    <div className="account-pages my-5 pt-sm-5 container">
      <Routes/>
    </div>
  );
});

export default App;
