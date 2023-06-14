import React, {FC, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {Context} from '../index';
import logo from '../assets/img/logo-w-s.svg'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6 col-xl-5">
        <div className="card overflow-hidden">
          <div className="bg-primary bg-soft">
            <div className="row">
              <div className="col-12">
                <div className="text-white p-4">
                  <h5 className="text-white">Добро пожаловать!</h5>
                  <p>Войдите в систему для работы.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="auth-logo"><a href="" className="auth-logo-dark">
              <div className="avatar-md profile-user-wid mb-4"><span className="avatar-title rounded-circle"> <img
                src={logo} alt="" className="rounded-circle" height="50"/> </span>
              </div>
            </a></div>
            <div className="p-2">
              <form className="form-horizontal" method="post">
                <div className="mb-3">
                  <label htmlFor="login" className="form-label">Логин</label>
                  <input
                    type="text"
                    name="login"
                    className="form-control"
                    id="login"
                    placeholder="Ваш логин в системе"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Пароль</label>
                  <div className="input-group auth-pass-inputgroup">
                    <input
                      type="password"
                      name="pwd"
                      className="form-control"
                      placeholder="Введите пароль"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                    />
                    <button className="btn btn-light " type="button" id="password-addon">
                      <i className="mdi mdi-eye-outline"></i>
                    </button>
                  </div>
                </div>
                <input type="hidden" name="is_login" value="1"/>
                <div className="mt-3 d-grid">
                  <button
                    className="btn btn-primary waves-effect waves-light"
                    onClick={() => store.login(email, password)}
                  >
                    Войти
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <Link to="/forgot" className="text-muted">
                    <i className="mdi mdi-lock me-1"></i>Забыли пароль?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <div>
            <p>
              Еще нет аккаунта? <span
              className="fw-medium text-primary"
              onClick={() => store.registration(email, password)}
            >Зарегистрироваться</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LoginForm);
