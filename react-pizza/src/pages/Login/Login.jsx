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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'kostya@mail.ru',
      password: '12345',
    },
    mode: 'onChange',
  });
  if (isAuth) {
    return <Navigate to='/' />;
  }
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      alert('Неверный логин или пароль');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      alert('Вы успешно авторизировались!');
    }
  };

  return (
    <div className={style.root}>
      <h1>Вход в личный кабинет</h1>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Укажите почту' })}
          />
          <input
            type='password'
            placeholder='Пароль'
            {...register('password', { required: 'Укажите пароль' })}
          />
          <button disabled={!isValid} type='submit'>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
