import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/login';

const Nav = (props) => {
  const navigate = useNavigate();
  const { dispatch } = props;
  const { name, avatarURL } = props.userData;

  const handleMenuClick = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case 'Logout':
        dispatch(logout(props.authedUser));
        navigate('/login');
        break;
      case 'Home':
        navigate('/');
        break;
      case 'Leaderboard':
        navigate('/leaderboard');
        break;
      case 'New':
        navigate('/add');
        break;
      default:
        break;
    }
  };
  return (
    <nav>
      <div className='left-nav'>
        <div>
          <span className='nav-link' onClick={handleMenuClick}>
            Home
          </span>
        </div>
        <div>
          <span className='nav-link' onClick={handleMenuClick}>
            Leaderboard
          </span>
        </div>
        <div>
          <span className='nav-link' onClick={handleMenuClick}>
            New
          </span>
        </div>
      </div>
      <div className='right-nav'>
        <div>
          <img className='avatar-small' src={avatarURL} alt='avatar' />
        </div>
        <div>{name}</div>
        <div>
          <button className='nav-button' onClick={handleMenuClick}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ users, login }) => {
  const authedUser = login.authedUser;
  const userData = users[authedUser];

  return { authedUser, userData };
};

export default connect(mapStateToProps)(Nav);
