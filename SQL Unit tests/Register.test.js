import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Register from '../frontend/src/pages/Register';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate hook
}));

describe('Register Component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Register />);
    const headerElement = getByText(/Register/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays error message when registering with empty fields', async () => {
    const { getByText, getByRole } = render(<Register />);
    const navigate = useNavigate(); // Mock useNavigate
    const registerButton = getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = getByText(/Please fill in all fields/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
