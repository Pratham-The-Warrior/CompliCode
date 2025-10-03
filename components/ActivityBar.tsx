import React from 'react';
import AnalysisIcon from './icons/AnalysisIcon';
import SaveIcon from './icons/SaveIcon';
import LoadIcon from './icons/LoadIcon';

interface ActivityBarProps {
  onAnalyze: () => void;
  onSave: () => void;
  onLoad: () => void;
  isLoading: boolean;
}


const ActivityBar: React.FC<ActivityBarProps> = ({ onAnalyze, onSave, onLoad, isLoading }) => {
  return (
    <nav className="bg-[var(--color-bg-secondary)] w-14 flex flex-col items-center py-4 space-y-2 flex-shrink-0 border-r border-[var(--color-border-secondary)]">
      <button 
        onClick={onAnalyze}
        disabled={isLoading}
        className="relative text-[var(--color-text-primary)] p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed" 
        aria-label="Analyze Code Complexity"
        title="Check Complexity"
      >
        {isLoading ? (
            <svg className="animate-spin h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
          <AnalysisIcon className="w-7 h-7" />
        )}
        <span className="absolute left-0 top-2 bottom-2 w-1 bg-[var(--color-accent)] rounded-full"></span>
      </button>

      <div className="flex-grow"></div>

      <button 
        onClick={onSave}
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)]"
        aria-label="Save Code Snippet"
        title="Save Snippet"
      >
        <SaveIcon className="w-6 h-6" />
      </button>

      <button 
        onClick={onLoad}
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)]"
        aria-label="Load Code Snippet"
        title="Load Snippet"
      >
        <LoadIcon className="w-6 h-6" />
      </button>
      
    </nav>
  );
};

export default ActivityBar;