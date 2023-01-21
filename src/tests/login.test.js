import { fireEvent, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Login from '../components/Login';

const mockStore = configureMockStore();

describe('Login', () => {
  it('will show an error message if the username passed is wrong', () => {
    const store = mockStore({
      usersList: [
        ['sarahedo', 'Sarah Edo', 'password123'],
        ['zoshikanlu', 'Zenobia Oshikanlu', 'pass246'],
      ],
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    var userInput = component.getByTestId('user-input');
    var passInput = component.getByTestId('pass-input');
    fireEvent.change(userInput, {
      target: { value: 'demoWrongUserName' },
    });
    fireEvent.change(passInput, { target: { value: 'password123' } });
    var submitButton = component.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(
      component.getByText('Wrong username or password')
    ).toBeInTheDocument();
  });

  it('will show an error message if the password passed is wrong', () => {
    const store = mockStore({
      usersList: [
        ['sarahedo', 'Sarah Edo', 'password123'],
        ['zoshikanlu', 'Zenobia Oshikanlu', 'pass246'],
      ],
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    var userInput = component.getByTestId('user-input');
    var passInput = component.getByTestId('pass-input');
    fireEvent.change(userInput, {
      target: { value: 'sarahedo' },
    });
    fireEvent.change(passInput, { target: { value: 'demoWrongPass' } });
    var submitButton = component.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(
      component.getByText('Wrong username or password')
    ).toBeInTheDocument();
  });

  it('will login successful if the user and password are correct', async () => {
    const store = mockStore({
      usersList: [
        ['sarahedo', 'Sarah Edo', 'password123'],
        ['zoshikanlu', 'Zenobia Oshikanlu', 'pass246'],
      ],
    });
    const actions = store.getActions();
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    var userInput = component.getByTestId('user-input');
    var passInput = component.getByTestId('pass-input');
    fireEvent.change(userInput, {
      target: { value: 'sarahedo' },
    });
    fireEvent.change(passInput, { target: { value: 'password123' } });
    var submitButton = component.getByTestId('submit-button');
    fireEvent.click(submitButton);
    store.dispatch({ type: 'LOGIN', payload: { authedUser: 'sarahedo' } });
    expect(store.getActions()).toEqual([
      { type: 'LOGIN', payload: { authedUser: 'sarahedo' } },
    ]);
  });
});
