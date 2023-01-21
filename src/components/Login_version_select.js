import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [alertMessage, setAlertMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('');

  console.log('selectedOption', selectedOption);
  const handleSelection = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (selectedOption !== 'Select user' && selectedOption !== '') {
      dispatch(login(selectedOption));
      navigate(-1);
    } else {
      setAlertMessage('Please select an user');
    }
  };

  /* const [usersList, setUsersList] = useState([]);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (e) => {
    const user = e.target.value;
    setUser(user);
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
  }; */

  return (
    <>
      <div>Employee Polls</div>
      <div>IMAGEN</div>
      <div>Login</div>

      <div>
        <span className='alert-message'>{alertMessage}</span>
      </div>
      <form>
        Select user:
        {/* The object { usersList: [user.id, user.name] }*/}
        <select value={selectedOption} onChange={handleSelection}>
          <option>Select user</option>
          {props.usersList.map((user) => (
            <option key={user[0]} value={user[0]}>
              {user[1]}
            </option>
          ))}
        </select>
        <button type='submit' onClick={(e) => handleLoginSubmit(e)}>
          SUBMIT
        </button>
      </form>
    </>
  );
};

const mapStateToProps = ({ users }) => {
  if (!users) {
    return { usersList: [] };
  }
  return {
    usersList: Object.values(users).map((user) => [user.id, user.name]),
  };
};

export default connect(mapStateToProps)(Login);
