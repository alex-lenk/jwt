import type { FC } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStores } from '../store';
import { ROUTES_LINKS } from './routesLinks';
import { observer } from 'mobx-react-lite';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(8, 'Не менее 2 символов'),
  email: Yup.string()
    .email('Некорректный email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(32, 'Не более 32 символов'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
});


const Profile: FC = () => {
  const { networkStore } = useStores();

  const formik = useFormik({
    initialValues: {
      name: networkStore.user.name,
      email: networkStore.user.email,
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('onSubmit');
      const { name, email, password } = values;
      const userUpdates = {
        name: name !== networkStore.user.name ? name : undefined,
        email: email !== networkStore.user.email ? email : undefined,
        password: password ? password : undefined,
      };
      // await networkStore.updateProfile(userUpdates);
    },
  });

  return <>
    <div className="row">
      <div className="col-lg-6">
        <div className="card h-100 ">
          <form className="card-body" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
              <input type="text" name="name" id="inputName" className="form-control form-control-lg"
                     placeholder="Имя администратора"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="inputEmail" className="form-label visually-hidden-focusable">E-mail</label>
              <input type="text" name="email" id="inputEmail" className="form-control form-control-lg"
                     placeholder="Email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <input type="password" className="form-control form-control-lg" id="inputPassword" name="pwd"
                     placeholder="Введите пароль"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <input type="password" className="form-control form-control-lg" id="inputPassword2"
                     placeholder="Повторите пароль"
                     autoComplete="on" name="pwd2"
                     value={formik.values.confirmPassword}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
              />
            </div>


              <div className="d-flex flex-wrap gap-2 mt-3">
                <button type="submit" className="btn btn-primary waves-effect waves-light">Сохранить</button>
                &nbsp;&nbsp;
                <Link to={ ROUTES_LINKS.MAIN } className="btn btn-secondary waves-effect waves-light">Отмена</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  </>;
};

export default observer(Profile);
