import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    });
  };

  return (
    <div className='form-container'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <h1>Account Login</h1>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                className='form-control'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form-control'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <input
              type='submit'
              value='Login'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  );
};

export default Login;
