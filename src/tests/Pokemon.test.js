import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const path = history.location.pathname;

    const rigthPokemon = pokemons.find(
      (pokemon) => path === `/pokemons/${pokemon.id}`,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(`${rigthPokemon.name}`);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(`${rigthPokemon.type}`);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = rigthPokemon.averageWeight;
    expect(pokemonWeight.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getAllByRole('img')[0];
    expect(pokemonImage).toHaveAttribute('src', `${rigthPokemon.image}`);
    expect(pokemonImage).toHaveAttribute('alt', `${rigthPokemon.name} sprite`);
  });

  it('Teste o link para detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    const rigthPokemon = pokemons.find(
      (pokemon) => moreDetails.href === `http://localhost/pokemons/${pokemon.id}`,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(moreDetails).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe(rigthPokemon.name);

    const previousPath = history.location.pathname;
    userEvent.click(moreDetails);
    const path = history.location.pathname;
    expect(previousPath).not.toBe(path);
    expect(path).toBe(`/pokemons/${rigthPokemon.id}`);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFavorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkFavorite);
    const rigthPokemon = pokemons.find(
      (pokemon) => moreDetails.href === `http://localhost/pokemons/${pokemon.id}`,
    );

    const star = screen.getAllByRole('img')[1];
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${rigthPokemon.name} is marked as favorite`);
  });
});
