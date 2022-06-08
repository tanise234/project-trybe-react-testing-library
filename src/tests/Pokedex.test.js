import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const max = pokemons.length;
const types = pokemons.reduce(
  (array, item) => (array.includes(item.type) ? array : [...array, item.type]),
  [],
);
describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const msg = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(msg).toBeInTheDocument();
  });

  it('Teste o botão Próximo pokémon', () => {
    const btn = screen.getByTestId('next-pokemon');
    expect(btn.innerHTML).toBe('Próximo pokémon');

    // verifica os cliques um a um
    for (let index = 0; index < max; index += 1) {
      userEvent.click(btn);
      const pokemonsDisplayed = screen.getAllByTestId('pokemon-name');
      expect(pokemonsDisplayed.length).toBe(1);

      expect(pokemonsDisplayed[0].innerHTML).toBe(pokemons[(index + 1) % max].name);
    }
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const btns = screen.getAllByTestId('pokemon-type-button');
    const maxButtons = btns.length;
    for (let i = 0; i < maxButtons; i += 1) {
      for (let j = 0; j < i; j += 1) {
        expect(btns[i].innerHTML).not.toBe(btns[j].innerHTML);
      }
    }
    expect(types.length).toBe(maxButtons);

    btns.forEach((btn) => {
      userEvent.click(btn);
      const buttonName = btn.innerHTML;
      let pokemonType = screen.getByTestId('pokemon-type').innerHTML;
      expect(buttonName).toBe(pokemonType);
      const btnNext = screen.getByTestId('next-pokemon');
      userEvent.click(btnNext);
      pokemonType = screen.getByTestId('pokemon-type').innerHTML;
      expect(buttonName).toBe(pokemonType);
    });

    const btnAll = screen.getByText(/all/i);
    expect(btnAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnAll = screen.getAllByRole('button')[0];
    expect(btnAll.innerHTML).toBe('All');
    userEvent.click(btnAll);
    const btnNext = screen.getByText(/próximo pokémon/i);
    for (let i = 0; i < pokemons.length; i += 1) {
      const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
      expect(pokemons[i].name).toBe(pokemonName);
      userEvent.click(btnNext);
    }
  });
});
