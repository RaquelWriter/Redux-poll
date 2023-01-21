import { useNavigate } from 'react-router-dom';

const PollCard = ({ userName, dateTime, questionId }) => {
  const navigate = useNavigate();
  const handleShowQuestion = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <div className='poll-card'>
      <div>{<h4>{userName}</h4>}</div>
      <div>{dateTime}</div>
      <button
        className='margintop-small'
        type='submit'
        data-testid='submit-button'
        onClick={() => handleShowQuestion(questionId)}
      >
        Show question
      </button>
    </div>
  );
};

export default PollCard;
