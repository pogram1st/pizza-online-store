import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import style from './Login.module.scss';
// import { authLogin } from '../../redux/actions/auth';
import { fetchAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [errorAuth, setErrorAuth] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  if (isAuth) {
    return <Navigate to='/' />;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      setErrorAuth(true);
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      alert('Вы успешно авторизировались!');
    }
  };

  return (
    <div className={style.root}>
      <h2>Вход на сайт</h2>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          {errorAuth && <p>Неверно введен логин или пароль</p>}
          <input
            className={style.input1}
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Укажите почту' })}
          />
          <input
            className={style.input2}
            type='password'
            placeholder='Пароль'
            {...register('password', { required: 'Укажите пароль' })}
          />
          <button type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};
