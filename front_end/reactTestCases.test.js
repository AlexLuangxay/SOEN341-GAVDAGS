// Example of a simple React component test using React Testing Library and Jest
import { render, screen } from '@testing-library/react';
import App from "./src/pages/App.jsx"

test('Group', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
