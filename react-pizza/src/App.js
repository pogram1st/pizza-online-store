import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login/Login';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function getAuth() {
      await dispatch(fetchAuthMe());
    }
    getAuth();
  }, []);
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/cart' element={<Cart />} exact />
          <Route path='/login' element={<Login />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
