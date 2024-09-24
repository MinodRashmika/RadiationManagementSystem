import UserPage from '../frontend/src/pages/UserPage';
import { screen } from '@testing-library/react';

describe('UserPage Component', () => {
  test('should render without crashing', () => {
    // Render the UserPage component
    
    <UserPage />;
    
    // Check if the component exists
    expect(screen.getByTestId('user-page')).toBeInTheDocument();
  });

  test('should have an edit button', () => {
    // Check if the "Edit Entry" button is rendered
    expect(screen.getByText('Edit Entry')).toBeInTheDocument();
  });

  test('should have a delete button', () => {
    // Check if the "Delete Now" button is rendered
    expect(screen.getByText('Delete Now')).toBeInTheDocument();
  });
});
