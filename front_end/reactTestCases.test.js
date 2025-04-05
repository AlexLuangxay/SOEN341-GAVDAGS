import { render, screen } from '@testing-library/react';
import AddModal from './AddModal';

test('AddModal renders correctly', () => {
  render(<AddModal isOpen={true} onClose={() => {}} onAddChannel={() => {}} />);
  const heading = screen.getByText(/Add Channel/i);
  expect(heading).toBeInTheDocument();
});
