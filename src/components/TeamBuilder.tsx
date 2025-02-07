import React from 'react';
import { Users } from 'lucide-react';
import type { Pokemon, TeamMember } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface TeamBuilderProps {
  team: TeamMember[];
  onRemove: (pokemon: Pokemon) => void;
}

export function TeamBuilder({ team, onRemove }: TeamBuilderProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold">Your Team ({team.length}/6)</h2>
      </div>
      {team.length === 0 ? (
        <p className="text-gray-500 text-center">Your team is empty. Add some Pokemon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((pokemon) => (
            <PokemonCard
              key={pokemon.key}
              pokemon={pokemon}
              onRemove={onRemove}
              isInTeam
            />
          ))}
        </div>
      )}
    </div>
  );
}