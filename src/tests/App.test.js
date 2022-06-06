import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se a barra de navegação aparece e se o links redirecionam corretamente',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('Testa cada link de navegação', () => {
      const linkHome = screen.getByRole('link', { name: /Home/i });
      const linkAbout = screen.getByRole('link', { name: /About/i });
      const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorites).toBeInTheDocument();
    });

    it('URL / ao clicar no link Home', () => {
      const linkHome = screen.getByRole('link', { name: /Home/i });

      userEvent.click(linkHome);
      const headerHome = screen.getByRole('heading',
        { name: /Encountered pokémons/i, level: 2 });
      expect(headerHome).toBeInTheDocument();
    });

    it('URL /about, ao clicar no link About', () => {
      const linkAbout = screen.getByRole('link', { name: /About/i });

      userEvent.click(linkAbout);
      const headerAbout = screen.getByRole('heading',
        { name: /About Pokédex/i, level: 2 });
      expect(headerAbout).toBeInTheDocument();
    });

    it('URL /favorites, ao clicar no link Favorite Pokémons', () => {
      const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

      userEvent.click(linkFavorites);
      const headerFavorites = screen.getByRole('heading',
        { name: /Favorite pokémons/i, level: 2 });
      expect(headerFavorites).toBeInTheDocument();
    });

    it('página Not Found ao entrar em uma URL desconhecida', () => {
      const { history, getByRole } = renderWithRouter(<App />);

      history.push('/errado');

      const notFound = getByRole('heading',
        { name: /Page requested not found/i, level: 2 });
      expect(notFound).toBeInTheDocument();
    });
  });
