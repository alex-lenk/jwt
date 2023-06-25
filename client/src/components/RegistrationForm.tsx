import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStores } from '../store';
import logo from '../assets/img/logo-w-s.svg';
import { PAGE_NAMES, ROUTES_LINKS } from './routesLinks';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный email')
    .min(7, 'Не менее 7 символов')
    .max(32, 'Не более 32 символов')
    .required('Обязательный'),
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(32, 'Не более 32 символов')
    .required('Обязательный'),
});

const RegistrationForm: FC = () => {
  const {networkStore} = useStores();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      networkStore.registration(values.email, values.password);
    },
  });

  return (
    <div className="m-auto col-md-8 col-lg-6 col-xl-5 card overflow-hidden">
      <div className="bg-primary bg-soft p-4">
        <h5 className="text-white">Добро пожаловать!</h5>
        <p className="text-white">Войдите в систему для работы.</p>
      </div>

      <div className="card-body pt-0">
        <Link to={ ROUTES_LINKS.MAIN } className="auth-logo avatar-md profile-user-wid mb-3 avatar-title rounded-circle">
          <img src={ logo } alt="" className="rounded-circle"/>
        </Link>

        <form className="p-2 form-horizontal" onSubmit={ formik.handleSubmit }>
          <div className="mb-4">
            <label htmlFor="login" className="form-label visually-hidden-focusable">Логин</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              id="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Ваш email в системе"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback d-block">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="form-label visually-hidden-focusable">Пароль</label>
            <div className="input-group auth-pass-inputgroup">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Введите пароль"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback d-block">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div className="pt-2 d-grid">
            <button className="btn-primary btn-lg btn waves-effect waves-light" type="submit">Войти</button>
          </div>

          <div className="mt-4 text-center">
            <Link to={ ROUTES_LINKS.FORGOT } className="text-muted">
              <i className="mdi mdi-lock me-1"></i> { PAGE_NAMES.FORGOT }
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(RegistrationForm);
