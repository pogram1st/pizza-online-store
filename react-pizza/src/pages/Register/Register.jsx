import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import styles from './Register.module.scss';
import { Navigate } from 'react-router-dom';

export const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'all',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert('Не удалось зарегестрироваться', errors);
    } else {
      alert('Вы успешно зарегестрировались');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to='/' />;
  }
  //   if (errors.fullName) {
  //     errors.fullName.ref.focus();
  //   }
  //   if (errors.email) {
  //     errors.email.ref.focus();
  //   }
  //   if (errors.password) {
  //     errors.password.ref.focus();
  //   }
  console.log(errors);
  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h5>Создание аккаунта</h5>
        <div className={styles.avatar}>
          <img width={50} src='./img/default_logo_user.png' alt='' />
        </div>
        <input
          className={styles.input1}
          placeholder='Полное имя'
          type='text'
          {...register('fullName', { required: 'Укажите имя' })}
        />
        {errors.fullName && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.fullName.message}
          </p>
        )}
        <input
          className={styles.input2}
          placeholder='E-Mail'
          type={'email'}
          {...register('email', { required: 'Укажите E-mail' })}
        />
        {errors.email && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.email.message}
          </p>
        )}
        <input
          className={styles.input3}
          type='password'
          {...register('password', { required: 'Укажите пароль мин. 5 символов', minLength: 5 })}
          placeholder='Пароль'
        />
        {errors.password && (
          <p style={{ color: 'red', margin: '5px 0 0 0', width: '100%' }}>
            {errors.password.message.length === 0
              ? 'Введите пароль минимум 5 cимволов'
              : errors.password.message}
          </p>
        )}
        <button type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  );
};
