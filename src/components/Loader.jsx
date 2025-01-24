import React, { useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  useEffect(() => {
    const loader = document.querySelector('#loader');
    const timer = setTimeout(() => {
      if (loader) {
        loader.style.top = '-100%';
      }
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader">
      <h1>SUSTAIN.</h1>
      <h1>EVOLVE.</h1>
      <h1>FLOURISH.</h1>
    </div>
  );
};

export default Loader;
