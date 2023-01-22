import { _saveQuestion } from '../utils/_DATA';

// An async unit test to verify that the saved
// question is returned and all expected fields
// are populated when correctly formatted data
// is passed to the function.
describe('_saveQuestion', () => {
  it('will return true if the data passed is correctly formatted', async () => {
    var mockData = {
      optionOneText: 'mockOptionOne',
      optionTwoText: 'mockOptionTwo',
      author: 'sarahedo',
    };
    var mockResult = {
      author: 'sarahedo',
      id: expect.any(String),
      optionOne: { text: 'mockOptionOne', votes: [] },
      optionTwo: { text: 'mockOptionTwo', votes: [] },
      timestamp: expect.any(Number),
    };
    await expect(_saveQuestion(mockData)).resolves.toEqual(mockResult);
  });
  // An async unit test to verify that an error
  // is returned if incorrect data is passed to the function.
  it('will reject with a message if the data passed is not correctly formatted', async () => {
    var mockData = {
      optionOneText: '',
      optionTwoText: '',
      author: '',
    };
    await expect(_saveQuestion(mockData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});
