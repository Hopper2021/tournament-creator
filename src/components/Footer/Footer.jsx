import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <div>
      <div className="push"></div>
      <footer className="footer">
        &copy; Hopper Applications
      </footer>
    </div>
  )
}

export default Footer;
