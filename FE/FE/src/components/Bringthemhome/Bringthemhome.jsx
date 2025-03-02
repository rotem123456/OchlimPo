import React, { useEffect } from 'react';

export const BringThemHomeTicker = () => {
  useEffect(() => {

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://bringthemhomenow.net/1.1.0/hostages-ticker.js';
    script.integrity = 'sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne';
    script.crossOrigin = 'anonymous';
    

    document.getElementsByTagName('head')[0].appendChild(script);
    

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