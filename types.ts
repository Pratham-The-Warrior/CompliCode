export interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

// Fix for `window.showSaveFilePicker` not being in default TS lib.
// These types are for the File System Access API and are added to the global scope.
declare global {
  interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: {
      description: string;
      accept: {
        [mimeType: string]: string[];
      };
    }[];
  }

  interface FileSystemWritableFileStream extends WritableStream {
    write(data: Blob): Promise<void>;
    close(): Promise<void>;
  }

  interface FileSystemFileHandle {
    createWritable(): Promise<FileSystemWritableFileStream>;
  }

  interface Window {
    showSaveFilePicker(
      options?: SaveFilePickerOptions
    ): Promise<FileSystemFileHandle>;
  }
}
