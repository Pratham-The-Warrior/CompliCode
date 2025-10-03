import React from 'react';
import AnalysisIcon from './icons/AnalysisIcon';

interface AnalysisPlaceholderProps {
  onAnalyze: () => void;
}

const AnalysisPlaceholder: React.FC<AnalysisPlaceholderProps> = ({ onAnalyze }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[var(--color-text-secondary)]">
      <AnalysisIcon className="w-16 h-16 mb-4 opacity-30" />
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">Code Complexity Analysis</h3>
      <p className="max-w-xs mb-6 text-sm">
        Click the button below or use the icon in the activity bar to analyze the time and space complexity of your code.
      </p>
      <button
        onClick={onAnalyze}
        className="bg-[var(--color-accent)] text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition-opacity"
      >
        Run Analysis
      </button>
    </div>
  );
};

export default AnalysisPlaceholder;
