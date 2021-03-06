import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fileds', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (password.length < 6) {
      setAlert('Password must be at least 6 characteristics long', 'danger');
    } else {
      register({
        name: name,
        email: email,
        password: password,
      });
    }
  };

  return (
    <div className='form-container'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <h1>Account Register</h1>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                className='form-control'
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
            </div>
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
            <div className='form-group'>
              <label htmlFor='password'>Confirm Password</label>
              <input
                className='form-control'
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                required
              />
            </div>
            <input
              type='submit'
              value='Register'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
        <div className='col-4'></div>{' '}
      </div>
    </div>
  );
};

export default Register;
