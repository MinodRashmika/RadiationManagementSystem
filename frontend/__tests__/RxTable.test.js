import React from 'react';
import { render, fireEvent, queryByText, screen } from '@testing-library/react';
import RxTable from '../src/components/RxTable';
import ItemPage from '../src/pages/ItemPage'
;import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('RxTable Component', () => {
  it('Renders entries from Info.Asset', () => {
    const mockInfo = {
      asset: [
        { id: 1, Make: 'Make1', Model: 'Model1', 'Serial no': 'Serial1', 'Equipment use': 'Use1', Location: 'Location1', 'Last seen': 'Last1' },
        { id: 2, Make: 'Make2', Model: 'Model2', 'Serial no': 'Serial2', 'Equipment use': 'Use2', Location: 'Location2', 'Last seen': 'Last2' },
      ],
    };

    const { getByText } = render(<MemoryRouter><RxTable Title={{ mainTitle: 'Title', title: 'Subtitle' }} Info={mockInfo} /></MemoryRouter>);

    expect(getByText('Make1')).toBeInTheDocument();
    expect(getByText('Model1')).toBeInTheDocument();
    expect(getByText('Serial1')).toBeInTheDocument();
    expect(getByText('Use1')).toBeInTheDocument();
    expect(getByText('Location1')).toBeInTheDocument();
    expect(getByText('Last1')).toBeInTheDocument();

    expect(getByText('Make2')).toBeInTheDocument();
    expect(getByText('Model2')).toBeInTheDocument();
    expect(getByText('Serial2')).toBeInTheDocument();
    expect(getByText('Use2')).toBeInTheDocument();
    expect(getByText('Location2')).toBeInTheDocument();
    expect(getByText('Last2')).toBeInTheDocument();
  });

  it('Filters Info.Asset with search term', () => {
    const mockInfo = {
      asset: [
        { id: 1, Make: 'Make1', Model: 'Model1', 'Serial no': 'Serial1', 'Equipment use': 'Use1', Location: 'Location1', 'Last seen': 'Last1' },
        { id: 2, Make: 'Make2', Model: 'Model2', 'Serial no': 'Serial2', 'Equipment use': 'Use2', Location: 'Location2', 'Last seen': 'Last2' },
      ],
    };

    const { getByText, getByPlaceholderText } = render(
        <MemoryRouter>
            <RxTable Title={{ mainTitle: 'Title', title: 'Subtitle' }} Info={mockInfo} />
        </MemoryRouter>);

    // Search for entries with "Make1"
    fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'Make1' } });

    // Check if only the filtered entry is rendered
    expect(getByText('Make1')).toBeInTheDocument();
    expect(getByText('Model1')).toBeInTheDocument();
    expect(getByText('Serial1')).toBeInTheDocument();
    expect(getByText('Use1')).toBeInTheDocument();
    expect(getByText('Location1')).toBeInTheDocument();
    expect(getByText('Last1')).toBeInTheDocument();

      // Check if the other entry is not rendered
      expect(screen.queryByText('Make2')).toBeNull();
      expect(screen.queryByText('Model2')).toBeNull();
      expect(screen.queryByText('Serial2')).toBeNull();
      expect(screen.queryByText('Use2')).toBeNull();
      expect(screen.queryByText('Location2')).toBeNull();
      expect(screen.queryByText('Last2')).toBeNull();
  });

});
