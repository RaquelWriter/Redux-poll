import { connect } from 'react-redux';
const Leaderboard = (props) => {
  return (
    <div className='container'>
      <h1 className='title-section'>LEADERBOARD</h1>
      <table className='leaderboard-table'>
        <thead className='leaderboard-row'>
          <tr>
            <td className='leaderboard-cell'>
              <strong>USERS</strong>
            </td>
            <td className='leaderboard-cell'>
              <strong>ANSWERED</strong>
            </td>
            <td className='leaderboard-cell'>
              <strong>CREATED</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {props.usersList.map((user) => (
            <tr className='leaderboard-row' key={user.id}>
              <td className='leaderboard-cell'>
                <img className='avatar-small' src={user.image} alt='avatar' />
                <br />
                {user.name}
              </td>
              <td className='leaderboard-cell'>{user.answers}</td>
              <td className='leaderboard-cell'>{user.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const usersList = Object.values(users)
    .map((user) => ({
      image: user.avatarURL,
      id: user.id,
      name: user.name,
      answers: Object.keys(user.answers).length,
      created: Object.keys(user.questions).length,
    }))
    .sort((a, b) => b.answers - a.answers + (b.created - a.created));

  return { usersList };
};

export default connect(mapStateToProps)(Leaderboard);
