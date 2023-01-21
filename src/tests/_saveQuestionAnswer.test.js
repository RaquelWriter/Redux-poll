import { _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestionAnswer', () => {
  it('will return true if the data passed is correctly formatted', async () => {
    var mockData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };
    await expect(_saveQuestionAnswer(mockData)).resolves.toEqual(true);
  });
  it('will return false if the data passed is not correct', () => {
    var mockData = {
      authedUser: 'smith',
      qid: '1234',
      answer: 'optionthree',
    };
    expect(_saveQuestionAnswer(mockData)).resolves.toEqual(false);
  });
  it('will return a reject message if authedUser is missing from the data passed', async () => {
    var mockData = {
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };
    await expect(_saveQuestionAnswer(mockData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
  it('will return a reject message if qid is missing from the data passed', async () => {
    var mockData = {
      authedUser: 'sarahedo',
      answer: 'optionOne',
    };
    await expect(_saveQuestionAnswer(mockData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
  it('will return a reject message if answer is missing from the data passed', async () => {
    var mockData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
    };
    await expect(_saveQuestionAnswer(mockData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
