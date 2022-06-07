import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found,'
    + 'caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText('No favorite pokemon found');

    expect(msg).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    // favoritar Pikachu
    let moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    let favoritado = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritado);

    // favoritar Caterpie
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const bug = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    favoritado = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritado);

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);

    const pikachu = screen.getByText(/pikachu/i);
    const caterpie = screen.getByText(/caterpie/i);

    expect(pikachu).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });
});
