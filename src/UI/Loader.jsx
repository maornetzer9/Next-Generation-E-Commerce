import React from 'react';
import '../css/loader.css'
import { useDarkMode } from '../hooks/darkMode';

export default function Loader() {

const [ darkMode ] = useDarkMode();

  return (
    <div 
        className="loader-container"
        style={{background: darkMode ? 'black' : '#f0f2f5' }}
    >
      <div className="spinner"></div>
    </div>
  );
}
