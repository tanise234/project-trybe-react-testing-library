import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const info = screen.getByText(/this application simulates a pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const tittle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(tittle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph1 = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const paragraph2 = screen.getByText(
      /one can filter pokémons by type/i,
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
