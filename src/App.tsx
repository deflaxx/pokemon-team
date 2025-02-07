import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import { TeamBuilder } from './components/TeamBuilder';
import type { Pokemon, TeamMember } from './types/pokemon';
import { usePokemonSearch } from './hooks/usePokemonSearch';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const { pokemon, loading, error, suggestions } = usePokemonSearch(searchTerm);

  const handleAddToTeam = (pokemon: Pokemon) => {
    if (team.length >= 6) {
      toast.error('Your team is full! Remove a Pokemon first.');
      return;
    }
    if (team.some(p => p.key === pokemon.key)) {
      toast.error('This Pokemon is already in your team!');
      return;
    }
    setTeam([...team, pokemon]);
    toast.success(`${pokemon.species} added to your team!`);
  };

  const handleRemoveFromTeam = (pokemon: Pokemon) => {
    setTeam(team.filter(p => p.key !== pokemon.key));
    toast.success(`${pokemon.species} removed from your team!`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Pokemon Explorer</h1>
        
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          {suggestions.length > 0 && (
            <div className="mt-2 p-2 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <TeamBuilder team={team} onRemove={handleRemoveFromTeam} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}
          {pokemon && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pokemon.map((p) => (
                <PokemonCard
                  key={p.key}
                  pokemon={p}
                  onAdd={handleAddToTeam}
                  isInTeam={team.some(t => t.key === p.key)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;