import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSaveQuestions } from '../actions/questions';
import { handleSaveQuestionInUsers } from '../actions/users';

export function Add(props) {
  const navigate = useNavigate();
  const { dispatch } = props;
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstOption') {
      setFirstOption(value);
    } else if (name === 'secondOption') {
      setSecondOption(value);
    }
  };

  const handleSubmit = (e) => {
    console.log('AUTHOR: ', props.author);
    e.preventDefault();
    !firstOption && setAlertMessage('Please, type something as First Option');
    !secondOption && setAlertMessage('Please, type something as Second Option');
    if (firstOption && secondOption) {
      // Save question in questions and users
      dispatch(handleSaveQuestions(firstOption, secondOption, props.author));
      navigate('/');
    }
  };

  return (
    <div className='container'>
      <h1 className='title-section'>Would you rather?</h1>
      <h2>Create your own poll!</h2>
      <div>
        <span className='alert-message'>{alertMessage}</span>
      </div>
      <h3>First option:</h3>
      <input
        type='text'
        className='input-add'
        placeholder='First option'
        data-testid='input-first-option'
        name='firstOption'
        value={firstOption}
        onChange={handleChange}
      />
      <h3>Second option:</h3>
      <input
        type='text'
        className='input-add'
        name='secondOption'
        data-testid='input-second-option'
        placeholder='Second option'
        value={secondOption}
        onChange={handleChange}
      />
      <button data-testid='submit-button' type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

const mapStateToProps = ({ login }) => {
  const authedUser = login.authedUser;
  return {
    author: authedUser,
  };
};

export default connect(mapStateToProps)(Add);
