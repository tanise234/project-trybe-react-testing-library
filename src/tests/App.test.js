import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /Home/i });
  const linkAbout = screen.getByRole('link', { name: /About/i });
  const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorites).toBeInTheDocument();
});
