import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registrationSchema } from '../helpers/validationSchemas';
import { PAGE_NAMES, ROUTES_LINKS } from './routesLinks';
import { useStores } from '../store';

const RegistrationForm = () => {
  const { networkStore } = useStores();
  const initialValues = { displayName: '', email: '', password: '' };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await networkStore.register(values)
        formik.resetForm()
        console.log('try');
      } catch (error) {
        console.log('async error', error)
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
              id="displayName"
              className="form-control form-control-lg"
              placeholder="ФИО"
              { ...formik.getFieldProps('displayName') }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label visually-hidden-focusable">Логин</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              placeholder="Ваш email в системе"
              { ...formik.getFieldProps('email') }
            />
            { formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback d-block">{ formik.errors.email }</div>
            ) }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label visually-hidden-focusable">Пароль</label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              placeholder="Введите пароль"
              { ...formik.getFieldProps('password') }
            />
            { formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback d-block">{ formik.errors.password }</div>
            ) }
          </div>

          <div className="pt-2 d-grid">
            <button type="submit" className="btn-primary btn-lg btn waves-effect waves-light">Register</button>
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
