import React from 'react';

interface Language {
  id: string;
  name: string;
}
interface StatusBarProps {
  language: string;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  hasResult: boolean;
  hasError: boolean;
  supportedLanguages: Language[];
}

const StatusBar: React.FC<StatusBarProps> = ({ language, setLanguage, isLoading, hasResult, hasError, supportedLanguages }) => {
  let statusMessage = "Ready";
  let statusColor = "text-[var(--color-text-secondary)]";

  if (isLoading) {
    statusMessage = "Analyzing...";
    statusColor = "text-[var(--color-accent)]";
  } else if (hasError) {
    statusMessage = "Error";
    statusColor = "text-[var(--color-error-fg)]";
  } else if (hasResult) {
    statusMessage = "Analysis Complete";
    statusColor = "text-[var(--color-success)]";
  }

  return (
    <footer className="bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border-secondary)] px-4 py-1 text-xs text-[var(--color-text-secondary)] flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-2">
        {isLoading && (
          <svg className="animate-spin h-3 w-3 text-[var(--color-accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        )}
        <span className={statusColor}>{statusMessage}</span>
      </div>
      <div className="relative">
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-[var(--color-text-primary)] text-xs focus:outline-none cursor-pointer hover:bg-[var(--color-bg-secondary)] rounded-md py-0.5 pl-2 pr-6 appearance-none"
            aria-label="Select programming language"
          >
            {supportedLanguages.map(lang => (
              <option key={lang.id} value={lang.id} style={{backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)'}}>
                {lang.name}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[var(--color-text-secondary)]">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;