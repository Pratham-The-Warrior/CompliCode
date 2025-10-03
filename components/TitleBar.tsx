import React from "react";
import ThemeToggle from "./ThemeToggle";

interface TitleBarProps {
  themeName: string;
  onCycleTheme: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ themeName, onCycleTheme }) => {
  return (
    <header className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] py-1.5 text-xs flex-shrink-0 flex items-center justify-center relative border-b border-[var(--color-border-secondary)]">
      <p>Code Complexity Analyzer</p>
      <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 space-x-2">
        <span className="capitalize text-xs text-[var(--color-text-secondary)] hidden sm:inline">
          {themeName}
        </span>
        <ThemeToggle onToggle={onCycleTheme} />
      </div>
    </header>
  );
};

export default TitleBar;
