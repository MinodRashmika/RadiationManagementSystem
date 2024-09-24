import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../frontend/src/components/UserTable';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserTable component', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  ];

  test('should render user table correctly', () => {
    render(<UserTable Title={{ mainTitle: 'User List', title: 'List of Users' }} users={mockUsers} />);
    
    expect(screen.getByText('User List')).toBeInTheDocument();
    expect(screen.getByText('List of Users')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('should navigate to user page on row click', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(<UserTable Title={{ mainTitle: 'User List', title: 'List of Users' }} users={mockUsers} />);

    fireEvent.click(screen.getByText('John Doe'));
    expect(navigateMock).toHaveBeenCalledWith('/UserPage', { state: { data: mockUsers[0] } });

    fireEvent.click(screen.getByText('Jane Smith'));
    expect(navigateMock).toHaveBeenCalledWith('/UserPage', { state: { data: mockUsers[1] } });
  });
});
