import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const { name, summary, foundAt } = pokemons[0];

describe('Teste o componente <PokemonDetails.js />', () => {
  let linkDetails;
  beforeEach(() => {
    renderWithRouter(<App />);
    linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
  });

  it('Teste se as informações são mostradas na tela', () => {
    const title = screen.getByRole('heading', { name: `${name} Details` });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const textSummary = screen.getByText(`${summary}`);
    expect(title).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const textLocation = screen.getByRole('heading',
      { name: `Game Locations of ${name}`, level: 2 });
    expect(textLocation).toBeInTheDocument();

    const locationOnCard = screen.getAllByAltText(`${name} location`);
    const srcOnCard = locationOnCard.map((location) => location.src);
    foundAt.forEach((locationFromData) => {
      expect(srcOnCard).toContain(locationFromData.map);

      const locationName = screen.getByText(`${locationFromData.location}`);
      expect(locationName).toBeInTheDocument();

      const locationImage = locationOnCard.find(
        (location) => location.src === locationFromData.map,
      );
      expect(locationImage).toBeInTheDocument();
      expect(locationImage).toHaveAttribute('src', `${locationFromData.map}`);
      expect(locationImage).toHaveAttribute('alt', `${name} location`);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const checkbox = screen.getByText(/pokémon favoritado\?/i);
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const star = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();

    expect(checkbox.innerHTML).toMatch('Pokémon favoritado?');
  });
});
