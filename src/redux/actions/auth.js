import axios from '../../axios';

export const authLogin = (payload) => (dispatch) => {
  axios.post('auth/login', payload).then(({ data }) => {
    dispatch(authorization(data));
    return data;
  });
};

export const authorization = (data) => ({
  type: 'AUTHORIZATION',
  payload: data,
});
