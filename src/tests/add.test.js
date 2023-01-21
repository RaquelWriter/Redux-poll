import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Add from '../components/Add';

const mockStore = configureMockStore();

describe('Add', () => {
  it('will show alert message if first option are not filled when press button', () => {
    const store = mockStore({ login: { authedUser: 'sarahedo' } });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Add />
        </Provider>
      </MemoryRouter>
    );
    var inputFirstOption = component.getByTestId('input-first-option');
    var inputSecondOption = component.getByTestId('input-second-option');
    fireEvent.change(inputFirstOption, {
      target: { value: '' },
    });
    fireEvent.change(inputSecondOption, {
      target: { value: 'This is a demo second option' },
    });
    var submitButton = component.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(
      screen.getByText('Please, type something as First Option')
    ).toBeInTheDocument();
  });
  it('will show alert message if second option are not filled when press button', () => {
    const store = mockStore({ login: { authedUser: 'sarahedo' } });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Add />
        </Provider>
      </MemoryRouter>
    );
    var inputFirstOption = component.getByTestId('input-first-option');
    var inputSecondOption = component.getByTestId('input-second-option');
    fireEvent.change(inputFirstOption, {
      target: { value: 'This is a demo first option' },
    });
    fireEvent.change(inputSecondOption, {
      target: { value: '' },
    });
    var submitButton = component.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(
      screen.getByText('Please, type something as Second Option')
    ).toBeInTheDocument();
  });
});
