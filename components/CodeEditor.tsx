import React from 'react';

interface Language {
  id: string;
  name: string;
  extension: string;
}
interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  supportedLanguages: Language[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, language, supportedLanguages }) => {
  const currentLanguage = supportedLanguages.find(lang => lang.id === language) || supportedLanguages[0];

  return (
    <div className="bg-[var(--color-bg-secondary)] flex flex-col h-full">
      <div className="flex-shrink-0 bg-[var(--color-bg-tertiary)] text-sm text-[var(--color-text-secondary)] flex justify-between items-center border-b border-[var(--color-border-primary)]">
        <span className="px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
          main.{currentLanguage.extension}
        </span>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full flex-grow bg-[var(--color-code-bg)] text-[var(--color-code-text)] p-4 font-fira-code text-sm resize-none focus:outline-none leading-relaxed"
        spellCheck="false"
        aria-label="Code Input Area"
      />
    </div>
  );
};

export default CodeEditor;