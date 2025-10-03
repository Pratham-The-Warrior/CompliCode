import React from 'react';
import PaletteIcon from './icons/PaletteIcon';

interface ThemeToggleProps {
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-1.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-tertiary)] focus:ring-[var(--color-accent)]"
      aria-label="Cycle through themes"
      title="Cycle Themes"
    >
      <PaletteIcon className="w-4 h-4" />
    </button>
  );
};

export default ThemeToggle;