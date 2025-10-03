import React, { useState, useCallback, useRef, useMemo } from 'react';
import CodeEditor from './components/CodeEditor';
import ComplexityDisplay from './components/ComplexityDisplay';
import Loader from './components/Loader';
import { analyzeCodeComplexity } from './services/geminiService';
import type { ComplexityResult } from './types';
import TitleBar from './components/TitleBar';
import ActivityBar from './components/ActivityBar';
import StatusBar from './components/StatusBar';
import { themes } from './themes';
import type { Theme } from './themes';
import AnalysisPlaceholder from './components/AnalysisPlaceholder';

const supportedLanguages = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'csharp', name: 'C#', extension: 'cs' },
  { id: 'go', name: 'Go', extension: 'go' },
  { id: 'rust', name: 'Rust', extension: 'rs' },
];

const App: React.FC = () => {
  const [code, setCode] = useState<string>(`function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}`);
  const [complexity, setComplexity] = useState<ComplexityResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('javascript');
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme: Theme = themes[themeIndex];

  const cycleTheme = useCallback(() => {
    setThemeIndex(current => (current + 1) % themes.length);
  }, []);

  const themeStyles = useMemo(() => {
    const cssVars = Object.entries(currentTheme.colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join('\n');
    return `:root { ${cssVars} }`;
  }, [currentTheme]);


  const handleAnalyze = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze.');
      setComplexity(null);
      setIsAnalysisPanelOpen(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setComplexity(null);
    setIsAnalysisPanelOpen(true); // Open the panel immediately to show the loader
    try {
      const result = await analyzeCodeComplexity(code, language);
      setComplexity(result);
    } catch (err) {
      setError(err instanceof Error ? `Failed to analyze code: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleClosePanel = useCallback(() => {
    setIsAnalysisPanelOpen(false);
  }, []);

  const handleSave = useCallback(async () => {
    const currentLang = supportedLanguages.find(l => l.id === language) || supportedLanguages[0];
    const blob = new Blob([code], { type: 'text/plain' });

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `snippet.${currentLang.extension}`,
        types: [{
          description: `${currentLang.name} File`,
          accept: { 'text/plain': [`.${currentLang.extension}`] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      if (!(err instanceof Error && err.name === 'AbortError')) {
        console.error('File System Access API failed:', err);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `snippet.${currentLang.extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  }, [code, language]);

  const handleLoadTrigger = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileSelected = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCode(text);

      const extension = file.name.split('.').pop();
      const detectedLang = supportedLanguages.find(l => l.extension === extension);
      if (detectedLang) {
        setLanguage(detectedLang.id);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  }, []);


  return (
    <>
    <style>{themeStyles}</style>
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <TitleBar themeName={currentTheme.name} onCycleTheme={cycleTheme} />
      <div className="flex flex-grow overflow-hidden">
        <ActivityBar onAnalyze={handleAnalyze} onSave={handleSave} onLoad={handleLoadTrigger} isLoading={isLoading} />
        <main className="flex-grow flex w-full">
          <div className={`flex flex-col transition-all duration-300 ease-in-out ${isAnalysisPanelOpen ? 'w-3/5' : 'w-full'}`}>
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              supportedLanguages={supportedLanguages}
            />
          </div>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${isAnalysisPanelOpen ? 'w-2/5' : 'w-0'} bg-[var(--color-bg-secondary)]`}>
            <div className="h-full overflow-y-auto">
              <div className="flex h-full items-start justify-center">
                {isLoading && <Loader />}
                {!isLoading && error && (
                   <div className="p-6 w-full">
                    <div className="text-[var(--color-error-fg)] bg-[var(--color-error-bg)] p-4 rounded-md w-full border border-[var(--color-error-border)]">
                      <h3 className="font-semibold mb-2">Analysis Error</h3>
                      <p className="text-sm">{error}</p>
                    </div>
                   </div>
                )}
                {!isLoading && !error && complexity && <ComplexityDisplay result={complexity} onClose={handleClosePanel} />}
                {!isLoading && !error && !complexity && isAnalysisPanelOpen && (
                   <AnalysisPlaceholder onAnalyze={handleAnalyze} />
                 )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <StatusBar 
        language={language} 
        setLanguage={setLanguage}
        isLoading={isLoading}
        hasResult={!!complexity && isAnalysisPanelOpen}
        hasError={!!error && isAnalysisPanelOpen}
        supportedLanguages={supportedLanguages}
      />
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelected}
        className="hidden"
        accept={supportedLanguages.map(l => `.${l.extension}`).join(',')}
      />
    </div>
    </>
  );
};

export default App;