  window.loadContentFile = (src) => {
    return new Promise((resolve, reject) => {
      const oldScript = document.getElementById('dynamic-content');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = src;
      script.id = 'dynamic-content';
      script.onload = () => {
        try {
          const { appTitle, sectionsData } = window.__content();
          resolve({ appTitle, sectionsData });
        } catch (err) {
          reject(new Error('Content script did not provide __content()'));
        }
      };
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  };