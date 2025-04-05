import { render, screen } from '@testing-library/react';
import AddModal from './src/pages/AddModal.jsx';
import React from 'react'; 

test('AddModal renders correctly', () => {
  render(<AddModal isOpen={true} onClose={() => {}} onAddChannel={() => {}} />);
  const heading = screen.getByText(/Add Channel/i);
  expect(heading).toBeInTheDocument();
});
