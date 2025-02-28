import React, { useEffect } from 'react';

export const BringThemHomeTicker = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://bringthemhomenow.net/1.1.0/hostages-ticker.js';
    script.integrity = 'sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne';
    script.crossOrigin = 'anonymous';
    
    // Append to head
    document.getElementsByTagName('head')[0].appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptElement = document.querySelector('script[src="https://bringthemhomenow.net/1.1.0/hostages-ticker.js"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return <div id="bthn" lang="en"></div>;
};

export default BringThemHomeTicker;