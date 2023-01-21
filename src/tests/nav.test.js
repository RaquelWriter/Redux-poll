import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import Nav from '../components/Nav';

const mockStore = configureMockStore();

describe('Nav', () => {
  it('will match snapshot if authedUser, name and avatarURL is passed', () => {
    const store = mockStore({
      login: { authedUser: 'saraedo' },
      users: {
        saraedo: {
          name: 'Sara Edo',
          avatarURL: 'https://example.com/avatar.jpg',
        },
      },
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
