import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Help from './components/Help';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <LoginForm/> }/>
        <Route path="/*" element={ <ProtectedRoute/> }>
          <Route path="/main" element={ <Main/> }/>
          <Route path="/help" element={ <Help/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
