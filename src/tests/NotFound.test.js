import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste o componente <NotFound.js />', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/errado');
  const msg = screen.getByRole('heading',
    { name: /page requested not found crying emoji/i, level: 2 });
  expect(msg).toBeInTheDocument();

  const image = screen.getAllByRole('img');
  expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
