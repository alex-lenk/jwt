import { observer } from 'mobx-react-lite';
import Routes from './Routes';

const App = observer(() => {
  return (
    <div className="App">
      <Routes/>
    </div>
  );
});

export default App;
