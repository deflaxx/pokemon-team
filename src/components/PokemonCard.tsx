import React from 'react';
import { Plus, X, Heart, Swords, Shield, Zap } from 'lucide-react';
import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onAdd?: (pokemon: Pokemon) => void;
  onRemove?: (pokemon: Pokemon) => void;
  isInTeam?: boolean;
}

export function PokemonCard({ pokemon, onAdd, onRemove, isInTeam }: PokemonCardProps) {
  const flavorText = pokemon.flavorTexts?.[0]?.flavor;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-2 border-${pokemon.color}-200`}>
      <div className="relative">
        <img
          src={pokemon.sprite}
          alt={pokemon.species}
          className="w-32 h-32 mx-auto"
        />
        {(onAdd || onRemove) && (
          <button
            onClick={() => isInTeam ? onRemove?.(pokemon) : onAdd?.(pokemon)}
            className={`absolute top-0 right-0 p-1 rounded-full ${
              isInTeam ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {isInTeam ? <X size={20} /> : <Plus size={20} />}
          </button>
        )}
      </div>
      <h3 className="text-xl font-bold text-center mt-2">{pokemon.species}</h3>
      <p className="text-center text-gray-600 mb-2">#{pokemon.num}</p>
      
      <div className="flex gap-1 justify-center mb-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-2 py-1 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>

      {flavorText && (
        <p className="text-sm text-gray-600 italic mb-3 line-clamp-2">
          "{flavorText}"
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <Heart className="text-red-500" size={16} />
          <span>HP: {pokemon.baseStats.hp}</span>
        </div>
        <div className="flex items-center gap-1">
          <Swords className="text-orange-500" size={16} />
          <span>ATK: {pokemon.baseStats.attack}</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="text-blue-500" size={16} />
          <span>DEF: {pokemon.baseStats.defense}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="text-yellow-500" size={16} />
          <span>SPD: {pokemon.baseStats.speed}</span>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500 text-center">
        {(pokemon.height / 10).toFixed(1)}m • {(pokemon.weight / 10).toFixed(1)}kg
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  
  return colors[type.toLowerCase()] || '#777777';
}