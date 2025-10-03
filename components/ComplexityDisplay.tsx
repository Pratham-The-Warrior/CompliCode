import React from 'react';
import type { ComplexityResult } from '../types';
import ClockIcon from './icons/ClockIcon';
import MemoryIcon from './icons/MemoryIcon';
import CloseIcon from './icons/CloseIcon';

interface ComplexityDisplayProps {
  result: ComplexityResult;
  onClose: () => void;
}

const ComplexityDisplay: React.FC<ComplexityDisplayProps> = ({ result, onClose }) => {
  
  const renderExplanation = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(`[\s\S]*?`|\*\*[\s\S]*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-[var(--color-code-highlight-bg)] text-[var(--color-code-highlight-text)] font-fira-code rounded-sm px-1.5 py-0.5 text-xs mx-0.5">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-[var(--color-accent)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
       <div className="flex-shrink-0 bg-[var(--color-bg-tertiary)] text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-border-primary)] flex justify-between items-center">
        <span className="px-4 py-2 text-[var(--color-text-primary)] inline-block">
          Analysis Result
        </span>
        <button 
          onClick={onClose}
          className="mr-2 p-1 rounded-md hover:bg-[var(--color-bg-tertiary)]"
          aria-label="Close Analysis Panel"
          title="Close Panel"
        >
          <CloseIcon className="w-4 h-4 text-[var(--color-text-primary)]" />
        </button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-tertiary)] p-4 rounded-lg border border-[var(--color-border-primary)]">
            <div className="flex items-center space-x-3 mb-2">
              <ClockIcon className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-md font-medium text-[var(--color-text-secondary)]">Time Complexity</h3>
            </div>
            <p className="text-2xl font-semibold text-[var(--color-accent-fg)] font-fira-code">
              {result.timeComplexity}
            </p>
          </div>

          <div className="bg-[var(--color-bg-tertiary)] p-4 rounded-lg border border-[var(--color-border-primary)]">
            <div className="flex items-center space-x-3 mb-2">
              <MemoryIcon className="w-5 h-5 text-[var(--color-accent-secondary)]" />
              <h3 className="text-md font-medium text-[var(--color-text-secondary)]">Space Complexity</h3>
            </div>
            <p className="text-2xl font-semibold text-[var(--color-accent-secondary-fg)] font-fira-code">
              {result.spaceComplexity}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">Explanation</h3>
          <div className="text-[var(--color-text-secondary)] leading-relaxed text-sm space-y-2 prose">
            {renderExplanation(result.explanation)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .prose {
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
};

export default ComplexityDisplay;