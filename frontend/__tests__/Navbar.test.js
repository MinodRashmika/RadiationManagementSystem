import React from 'react';
import { fireEvent, getByLabelText, getByRole, getByTitle, render } from '@testing-library/react';
import Navbar from '../src/components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


describe('Navbar Component', () => {
  it('Displays correct default titles', () => {
    const { getByText } = render(<MemoryRouter><Navbar isDropdown={true}/></MemoryRouter>);

    expect(getByText('Add New')).toBeInTheDocument();
    expect(getByText('View Data')).toBeInTheDocument();
    expect(getByText('Archives')).toBeInTheDocument();
    expect(getByText('Import Data')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
  });

  it('Displays titles as props inserted', () => {
    const titleProps = {
      Title1: 'Custom Title 1',
      Title2: 'Custom Title 2',
      Title3: 'Custom Title 3',
      Title4: 'Custom Title 4',
      Title5: 'Custom Title 5',
    };
    const { getByText } = render(<MemoryRouter><Navbar Title={titleProps}/></MemoryRouter>);
    
    expect(getByText('Custom Title 1')).toBeInTheDocument('Custom Title 1');
    expect(getByText('Custom Title 2')).toBeInTheDocument('Custom Title 2');
    expect(getByText('Custom Title 3')).toBeInTheDocument('Custom Title 3');
    expect(getByText('Custom Title 4')).toBeInTheDocument('Custom Title 4');
    expect(getByText('Custom Title 5')).toBeInTheDocument('Custom Title 5');
  });
});
