import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';

function extractSuggestions(errorMessage: string): string[] {
  const match = errorMessage.match(/Did you mean the enum value (.*?)\?/);
  if (!match) return [];
  
  return match[1]
    .split(', ')
    .map(s => s.replace(/['"]/g, ''))
    .filter(Boolean);
}

export function usePokemonSearch(search: string) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!search || search.length < 2) {
      setPokemon([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestions([]);

    fetch('https://graphqlpokemon.favware.tech/v8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetPokemonBySpecie($pokemon: PokemonEnum!) {
            getPokemon(pokemon: $pokemon) {
              key: species
              sprite
              num
              species
              color
              types {
                name
              }
              baseStats {
                hp
                attack
                defense
                specialattack
                specialdefense
                speed
              }
              flavorTexts {
                flavor
                game
              }
            }
          }
        `,
        variables: {
          pokemon: search.toLowerCase()
        }
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          const suggestions = extractSuggestions(json.errors[0].message);
          if (suggestions.length > 0) {
            setSuggestions(suggestions);
            setError(null);
          } else {
            throw new Error("No Pokemon found");
          }
          setPokemon([]);
          return;
        }
        if (json.data?.getPokemon) {
          const pokemonData = json.data.getPokemon;
          pokemonData.types = pokemonData.types.map((t: { name: string }) => t.name);
          setPokemon([pokemonData]);
          setSuggestions([]);
        } else {
          setPokemon([]);
        }
      })
      .catch(err => {
        setError(err);
        setPokemon([]);
        setSuggestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return { pokemon, loading, error, suggestions };
}