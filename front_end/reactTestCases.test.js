// Example of a simple React component test using React Testing Library and Jest
import React from 'react';
import { render, screen } from '@testing-library/react';
import AddModal from "./src/pages/AddModal.jsx"

test('groupChatName', () => {
  render(<AddModal />);
  const linkElement = screen.getByText(/chatName/i);
  expect(linkElement).toBeInTheDocument();
});
