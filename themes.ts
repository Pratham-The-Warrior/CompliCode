export interface Theme {
  name: string;
  colors: {
    // General UI
    'bg-primary': string;
    'bg-secondary': string;
    'bg-tertiary': string;
    'text-primary': string;
    'text-secondary': string;
    'border-primary': string;
    'border-secondary': string;

    // Accent & Status
    'accent': string;
    'accent-fg': string;
    'accent-secondary': string;
    'accent-secondary-fg': string;
    'success': string;
    'error-fg': string;
    'error-bg': string;
    'error-border': string;

    // Code & Syntax Highlighting (simplified)
    'code-bg': string;
    'code-text': string;
    'code-highlight-bg': string;
    'code-highlight-text': string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Slate',
    colors: {
      'bg-primary': '#111827', // slate-900
      'bg-secondary': '#1f2937', // slate-800
      'bg-tertiary': '#374151', // slate-700
      'text-primary': '#d1d5db', // slate-300
      'text-secondary': '#9ca3af', // slate-400
      'border-primary': 'rgba(71, 85, 105, 0.5)', // slate-700/50
      'border-secondary': 'rgba(0, 0, 0, 0.2)',

      'accent': '#38bdf8', // sky-400
      'accent-fg': '#7dd3fc', // sky-300
      'accent-secondary': '#a78bfa', // violet-400
      'accent-secondary-fg': '#c4b5fd', // violet-300
      'success': '#4ade80', // green-400
      'error-fg': '#f87171', // red-400
      'error-bg': 'rgba(153, 27, 27, 0.3)', // red-900/30
      'error-border': 'rgba(239, 68, 68, 0.5)', // red-500/50

      'code-bg': '#1f2937', // slate-800
      'code-text': '#d1d5db', // slate-300
      'code-highlight-bg': '#4b5563', // slate-600
      'code-highlight-text': '#fcd34d', // amber-400
    },
  },
  {
    name: 'Abyss',
    colors: {
      'bg-primary': '#0D1117',
      'bg-secondary': '#161B22',
      'bg-tertiary': '#21262D',
      'text-primary': '#C9D1D9',
      'text-secondary': '#8B949E',
      'border-primary': '#30363D',
      'border-secondary': '#30363D',

      'accent': '#58A6FF',
      'accent-fg': '#79C0FF',
      'accent-secondary': '#BC8EFF',
      'accent-secondary-fg': '#D2A8FF',
      'success': '#56D364',
      'error-fg': '#F85149',
      'error-bg': 'rgba(248, 81, 73, 0.1)',
      'error-border': 'rgba(248, 81, 73, 0.4)',

      'code-bg': '#161B22',
      'code-text': '#C9D1D9',
      'code-highlight-bg': '#31373e',
      'code-highlight-text': '#FFA657',
    },
  },
  {
    name: 'Daylight',
    colors: {
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#F3F4F6', // gray-100
      'bg-tertiary': '#E5E7EB', // gray-200
      'text-primary': '#1F2937', // gray-800
      'text-secondary': '#6B7280', // gray-500
      'border-primary': '#D1D5DB', // gray-300
      'border-secondary': '#E5E7EB', // gray-200

      'accent': '#2563EB', // blue-600
      'accent-fg': '#3B82F6', // blue-500
      'accent-secondary': '#7C3AED', // violet-600
      'accent-secondary-fg': '#8B5CF6', // violet-500
      'success': '#16A34A', // green-600
      'error-fg': '#DC2626', // red-600
      'error-bg': '#FEE2E2', // red-100
      'error-border': '#FECACA', // red-200

      'code-bg': '#F9FAFB', // gray-50
      'code-text': '#1F2937', // gray-800
      'code-highlight-bg': '#E5E7EB', // gray-200
      'code-highlight-text': '#D97706', // amber-600
    },
  },
];