import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').min(7, 'Не менее 7 символов')
    .max(32, 'Не более 32 символов').required('Обязательно!'),
  password: Yup.string().required('Обязательно!').min(8, 'Не менее 8 символов')
    .max(32, 'Не более 32 символов'),
});

export const registrationSchema = Yup.object().shape({
  displayName: Yup.string(),
  email: Yup.string().email('Некорректный email').email('Некорректный email').min(7, 'Не менее 7 символов')
    .max(32, 'Не более 32 символов').required('Обязательно!'),
  password: Yup.string().min(8, 'Не менее 8 символов').max(32, 'Не более 32 символов')
    .required('Обязательно!'),
});

export const validationSchema = Yup.object({
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
