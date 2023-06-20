import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import logo from '../assets/img/logo-w-s.svg';

const Forgot: FC = () => {
  return (
    <div className="m-auto col-md-8 col-lg-6 col-xl-5 card overflow-hidden">
      <div className="bg-primary bg-soft pt-5 pb-5 ps-4">
        <h5 className="text-white">Восстановление пароля</h5>
      </div>

      <div className="card-body pt-0">
        <Link to="/" className="auth-logo avatar-md profile-user-wid mb-3 avatar-title rounded-circle">
          <img src={ logo } alt="" className="rounded-circle"/>
        </Link>

        <div className="alert alert-primary mb-4" role="alert"> Введите ваш email, на него придет ссылка для
          восстановления пароля.
        </div>

        <form className="form-horizontal">
          <div className="mb-4">
            <label htmlFor="email" className="form-label visually-hidden-focusable">Email</label>
            <input type="email" name="email" className="form-control form-control-lg" id="email" placeholder="Ваш email"/>
          </div>

          <div className="mt-3 d-grid">
            <button className="btn-primary btn-lg btn waves-effect waves-light" type="submit">Восстановить</button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-muted">
              <i className="mdi mdi-lock me-1"></i> Авторизоваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(Forgot);
