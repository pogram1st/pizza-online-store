import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login/Login';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { fetchCart } from './redux/slices/cart';
import { Register } from './pages/Register/Register';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const authCart = useSelector(({ auth }) => auth.data);
  React.useEffect(() => {
    async function getAuth() {
      await dispatch(fetchAuthMe());
    }
    getAuth();
  }, []);

  React.useEffect(() => {
    if (authCart) {
      dispatch(fetchCart(authCart));
    }
  }, [authCart]);
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/cart' element={<Cart />} exact />
          <Route path='/login' element={<Login />} exact />
          <Route path='/register' element={<Register />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
