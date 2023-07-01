import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registrationSchema } from '../helpers/validationSchemas';
import { useStores } from '../store';
import { PAGE_NAMES, ROUTES_LINKS } from './routesLinks';

const RegistrationForm = () => {
  const { networkStore } = useStores();
  const initialValues = { displayName: '', email: '', password: '' }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await networkStore.registration(values);
        formik.resetForm();
        console.log('try');
      } catch (e) {
        console.log('async e', e);
      }
    },
  });

  return (
    <div className="m-auto col-md-8 col-lg-6 col-xl-5 card overflow-hidden">
      <div className="card-body pt-0">
        <form className="p-2 form-horizontal" onSubmit={ formik.handleSubmit }>
          <div className="mb-4">
            <label htmlFor="displayName" className="form-label visually-hidden-focusable">ФИО</label>
            <input
              type="text"
              name="displayName"
              className="form-control form-control-lg"
              id="displayName"
              placeholder="ФИО"
              onChange={ formik.handleChange }
              value={ formik.values.displayName }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label visually-hidden-focusable">Логин</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Ваш email в системе"
              onChange={ formik.handleChange }
              value={ formik.values.email }
            />
            { formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback d-block">{ formik.errors.email }</div>
            ) }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label visually-hidden-focusable">Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control form-control-lg"
              placeholder="Введите пароль"
              onChange={ formik.handleChange }
              value={ formik.values.password }
            />
            { formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback d-block">{ formik.errors.password }</div>
            ) }
          </div>

          <div className="pt-2 d-grid">
            <button type="submit" className="btn-primary btn-lg btn waves-effect waves-light">Войти</button>
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
