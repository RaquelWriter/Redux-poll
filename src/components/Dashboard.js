import { connect } from 'react-redux';
import PollCard from './PollCard';
import formatDate from '../utils/formatDate';

const Dashboard = (props) => {
  console.log(
    'authedUser: ',
    props.authedUser,
    'donequestions: ',
    props.doneQuestions,
    'newquestions: ',
    props.newQuestions
  );

  const { users, newQuestions, doneQuestions } = props;
  return (
    <>
      <div className='title-section'>New Questions</div>

      <div className='pollcards-wrapper'>
        {newQuestions.map((question) => (
          <PollCard
            key={question.id}
            userName={users[question.author].name}
            dateTime={formatDate(question.timestamp)}
            questionId={question.id}
          />
        ))}
      </div>

      <div className='title-section'>Questions done</div>

      <div className='pollcards-wrapper'>
        {doneQuestions.map((question) => (
          <PollCard
            key={question.id}
            userName={users[question.author].name}
            dateTime={formatDate(question.timestamp)}
            questionId={question.id}
          />
        ))}
      </div>
    </>
  );
};
const mapStateToProps = ({ login, questions, users }) => {
  const authedUser = login.authedUser;

  // Questions list where authedUser is in optionOne.votes or in optionTwo.votes
  // Return [{}, {}], each object is the entire question object from store
  const doneQuestions = Object.entries(questions)
    .filter(([, question]) => {
      return (
        (question.optionOne.votes &&
          question.optionOne.votes.includes(authedUser)) ||
        (question.optionTwo.votes &&
          question.optionTwo.votes.includes(authedUser))
      );
    })
    .map(([, question]) => question)
    .sort((a, b) => b.timestamp - a.timestamp);

  // Questions list where authedUser is not in optionOne.votes or in optionTwo.votes
  // Return [{id: .., author:..}, {}], each object is the entire question object from store
  const newQuestions = Object.entries(questions)
    .filter(([_id, question]) => {
      return (
        !question.optionOne.votes.includes(authedUser) &&
        !question.optionTwo.votes.includes(authedUser)
      );
    })
    .map(([, question]) => question)
    .sort((a, b) => b.timestamp - a.timestamp);

  return { authedUser, doneQuestions, newQuestions, users };
};

export default connect(mapStateToProps)(Dashboard);

// Comments about .filter(([, question])
// This is array destructuring
// the variable names
// on the left side of the = sign must match the number of elements
// in the array that is being destructured. In this case, the array
// is the entry which is coming from the Object.entries(questions) method,
// which has 2 elements: the id and the question.
// We could use: .filter (([_id, questions])),
// The _id variable is included in the filter function's parameter
// list to match the number of elements in the array,
// but it is not used in the filter function, it is just a placeholder
// variable.

//  Discarding the id variable is possible by using a comma (,)
// instead of a variable name.
