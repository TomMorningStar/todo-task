import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { TodoList } from '../TodoList';

describe('TodoList', () => {
  it('should render the component', () => {
    const { getByText } = render(<TodoList />);
    expect(getByText('Todos')).toBeInTheDocument();
  });

  it('should filter tasks based on the selected filter', async () => {
    const { getByText } = render(<TodoList />);
    const activeFilter = getByText('Active');
    const completedFilter = getByText('Completed');

    await waitFor(() => {
      activeFilter.click();
    })

    setTimeout(() => {
      expect(getByText('Task-1')).toBeInTheDocument();
      expect(getByText('Task-2')).not.toBeInTheDocument();
    }, 200)

    await waitFor(() => {
      completedFilter.click();
    })

    setTimeout(() => {
      expect(getByText('Task-1')).not.toBeInTheDocument();
      expect(getByText('Task-2')).toBeInTheDocument();
    }, 200)
  });

  it('should clear completed tasks when the "Clear completed" button is clicked', async () => {
    const { getByTestId, queryByLabelText } = render(<TodoList />);

    await waitFor(() => {
      getByTestId('clear-completed').click()
    })

    expect(queryByLabelText('Task-1')).not.toBeInTheDocument();
  });
});
