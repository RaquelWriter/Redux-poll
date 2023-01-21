import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const { usersList } = props;
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (e) => {
    const user = e.target.value;
    setUser(user);
    setAlertMessage('');
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    setAlertMessage('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    checkUserPassInDB(user, password);
  };
  const checkUserPassInDB = (user, pass) => {
    // Finds username
    const userFound = usersList.find((item) => {
      return item[0] === user;
    });
    // Check pass
    const passOK = userFound && userFound[2] === pass;
    if (userFound && passOK) {
      dispatch(login(user));
      navigate(-1);
    } else {
      setAlertMessage('Wrong username or password');
    }
  };
  return (
    <div className='margintop'>
      <h1>Employee Polls</h1>
      <div>
        <img className='avatar' src='/images/poll.jpg' alt='Poll' />
      </div>
      <h2>Login</h2>

      <div>
        <span className='alert-message'>{alertMessage}</span>
      </div>
      <form>
        <div>
          <h3 className='title-section'>Username</h3>
        </div>
        <input
          type='text'
          data-testid='user-input'
          className='input-login'
          value={user}
          placeholder='Username'
          onChange={handleUserChange}
        />
        <div>
          <h3 className='title-section'>Password</h3>
        </div>
        <input
          type='password'
          data-testid='pass-input'
          className='input-login'
          value={password}
          placeholder='Password'
          onChange={handlePasswordChange}
        />
        <div className='margintop'>
          <button
            type='submit'
            data-testid='submit-button'
            onClick={(e) => handleLoginSubmit(e)}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  if (!users) {
    return { usersList: [] };
  }
  return {
    usersList: Object.values(users).map((user) => [
      user.id,
      user.name,
      user.password,
    ]),
  };
};

export default connect(mapStateToProps)(Login);
