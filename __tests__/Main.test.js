import { screen } from '@testing-library/react';
import Main from '../frontend/src/pages/Main';

describe('Main component', () => {
  it('renders correctly', () => {
    // Render the Main component
    <Main />;
    
    // Check if the component renders with the title "Database"
    expect(screen.getByText('Database')).toBeInTheDocument();
    
    // Check if the "Add User" button is rendered
    expect(screen.getByText('Add User')).toBeInTheDocument();
    
    // Check if the "Add Item" button is rendered
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    
    // Check if the "Edit User" button is rendered
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });
});
