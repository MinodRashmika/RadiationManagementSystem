import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import { BrowserRouter } from 'react-router-dom'; // To provide routing context
import AddUser from '../frontend/src/pages/AddUser'; // Adjust the path as needed

describe('AddUser Component', () => {
  test('renders the user registration form', () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    // Check for the presence of various elements in the component
    expect(screen.getByText(/New User Entry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });
});
