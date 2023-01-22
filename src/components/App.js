import '../css/App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared.js';
import Nav from './Nav.js';
import Login from './Login';
import Add from './Add';
import Leaderboard from './Leaderboard';
import Dashboard from './Dashboard';
import Questions from './Questions';
import NotFoundPage404 from './NotFoundPage404';
import { Routes, Route, Redirect } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const App = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = [
    '/',
    '/leaderboard',
    '/questions/:questionId',
    '/add',
    '/404',
  ];

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  useEffect(() => {
    /*     if (!routes.includes(location.pathname)) {
      navigate('/404');
    } */
    if (!props.isLoggedIn) {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    } else if (props.isLoggedIn) {
      if (location.pathname === '/login') {
        navigate('/');
      }
    }
  }, []);

  return (
    <>
      {props.isLoggedIn && <Nav />}

      <Routes>
        <Route path='/login' element={<Login />} />
        {props.isLoggedIn && <Route path='/' exact element={<Dashboard />} />}
        <Route path='/questions/:questionId' element={<Questions />} />
        <Route path='/add' element={<Add />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/404' element={<NotFoundPage404 />} />
        <Route path='*' exact element={<NotFoundPage404 />} status={404} />
      </Routes>
    </>
  );
};

const mapStateToProps = ({ login, questions }) => {
  const { isLoggedIn, authedUser } = login;
  const questionsIdList = Object.values(questions).map(
    (question) => question.id
  );
  return { isLoggedIn, authedUser, questionsIdList };
};

export default connect(mapStateToProps)(App);
