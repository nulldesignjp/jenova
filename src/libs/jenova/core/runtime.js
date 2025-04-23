// This file is part of Jenova.
export function getOrCreateApp(createFn) {
    if (!window.__jenovaApp) {
      window.__jenovaApp = createFn();
    }
  
    if (import.meta.hot) {
      import.meta.hot.accept();
      import.meta.hot.dispose(() => {
        window.__jenovaApp?.dispose?.();
        window.__jenovaApp = null;
      });
    }
  
    return window.__jenovaApp;
  }