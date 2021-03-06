import React from 'react';
import MyTournaments from '../MyTournaments/MyTournaments'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h2 id="my-tournaments-header">My Tournaments</h2>
        <MyTournaments />
    </div>
  );
}

export default InfoPage;
