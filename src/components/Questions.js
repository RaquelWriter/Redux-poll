import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSaveAnswers } from '../actions/questions';
import { handleSaveAnswersInUsers } from '../actions/users';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};
function Questions(props) {
  const [questionFound, setQuestionFound] = useState(true);

  const navigate = useNavigate();
  console.log('props.router.params: ', props.router.params.questionId);

  useEffect(() => {
    props.qfound ? setQuestionFound(true) : setQuestionFound(false);
    !questionFound && navigate('/404');
    console.log('questionNotFound: ', questionFound);
  }, [questionFound]);

  const {
    dispatch,
    questionId,
    image,
    authorName,
    optionOne,
    optionTwo,
    isVotedByAuthedUser,
    numberOfPeopleOptionOne,
    numberOfPeopleOptionTwo,
    percentageOptionOne,
    percentageOptionTwo,
    optionVoted,
  } = props;

  const handleSendVote = (questionId, option) => {
    dispatch(handleSaveAnswers(questionId, option)).then(
      dispatch(handleSaveAnswersInUsers(questionId, option))
    );
  };
  return (
    <div className='container'>
      <h1 className='title-section'>Poll by {authorName}</h1>
      <div>
        <img className='avatar' src={image} alt='avatar' />
      </div>
      <div>QuestionId: {props.questionId}</div>
      <h2>Would you rather?</h2>
      <div className='container-options-poll'>
        <div
          className={
            optionVoted === 1
              ? 'option-marked-as-voted'
              : 'option-marked-as-no-voted'
          }
        >
          <h3>{optionOne}</h3>

          {
            // If is not voted by authedUser, show the button
            !isVotedByAuthedUser ? (
              <button
                className='button-option'
                type='submit'
                onClick={(e) => handleSendVote(questionId, 'optionOne')}
              >
                Vote
              </button>
            ) : (
              // If is voted show info:
              /* the number of people who voted for that option; the percentage of
          people who voted for that option. */

              <span>
                {numberOfPeopleOptionOne} votes. {percentageOptionOne} % of
                total users
                <br />
                {optionVoted === 1 ? (
                  <span>
                    <strong>You choosed this one!</strong>
                  </span>
                ) : null}
              </span>
            )
          }
        </div>
        <div
          className={
            optionVoted === 2
              ? 'option-marked-as-voted'
              : 'option-marked-as-no-voted'
          }
        >
          <h3>{optionTwo}</h3>
          {!isVotedByAuthedUser ? (
            <button
              className='button-option'
              type='submit'
              onClick={(e) => handleSendVote(questionId, 'optionTwo')}
            >
              Vote
            </button>
          ) : (
            <span>
              {numberOfPeopleOptionTwo} votes. {percentageOptionTwo} % of total
              users <br />
              {optionVoted === 2 ? (
                <span>
                  <strong>You choosed this one!</strong>
                </span>
              ) : null}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ login, users, questions }, props) => {
  const { isLoggedIn, authedUser } = login;
  const { questionId } = props.router.params;

  if (questions[questionId] === undefined) {
    return { qFound: false };
  }

  const question = questions[questionId];
  const authorId = question['author'];
  const authorName = users[authorId]['name'];
  const image = users[authorId]['avatarURL'];
  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const numberOfPeopleOptionOne = question.optionOne.votes.length;
  const numberOfPeopleOptionTwo = question.optionOne.votes.length;
  const percentageOptionOne =
    (question.optionOne.votes.length / Object.values(users).length) * 100;
  const percentageOptionTwo =
    (question.optionTwo.votes.length / Object.values(users).length) * 100;

  const isVotedByAuthedUser =
    (question.optionOne.votes &&
      question.optionOne.votes.includes(authedUser)) ||
    (question.optionTwo.votes && question.optionTwo.votes.includes(authedUser));

  let optionVoted = 0;

  if (isVotedByAuthedUser) {
    if (
      question.optionOne.votes &&
      question.optionOne.votes.includes(authedUser)
    ) {
      optionVoted = 1;
    }
    if (
      question.optionTwo.votes &&
      question.optionTwo.votes.includes(authedUser)
    ) {
      optionVoted = 2;
    }
  }

  return {
    questionId,
    image,
    authorName,
    optionOne,
    optionTwo,
    isVotedByAuthedUser,
    numberOfPeopleOptionOne,
    numberOfPeopleOptionTwo,
    percentageOptionOne,
    percentageOptionTwo,
    optionVoted,
    qfound: true,
  };
};

export default withRouter(connect(mapStateToProps)(Questions));
