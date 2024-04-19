import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; 

describe('App Component', () => {
  beforeEach(() => {
  });

  test('renders product list', () => {
    render(<App />);
    expect(screen.getByText('Product List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by title...')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(7); 
    expect(screen.getByText('Rows selected: 0')).toBeInTheDocument();
  });

  test('search functionality filters products', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(searchInput, { target: { value: 'Specific Product' } });
    expect(screen.queryByText('Another Product')).not.toBeInTheDocument();
  });

  test('delete selected rows button deletes selected rows', () => {
    render(<App />);
    const selectAllCheckbox = screen.getByLabelText('Select All Rows');
    fireEvent.click(selectAllCheckbox);
    const deleteSelectedButton = screen.getByText('Delete Selected');
    fireEvent.click(deleteSelectedButton);
    expect(screen.queryByText('Deleted Product')).not.toBeInTheDocument();
    expect(screen.queryByText('Rows selected: 1')).not.toBeInTheDocument();
  });
  
  test('previous button decrements current page', () => {
    render(<App />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});
