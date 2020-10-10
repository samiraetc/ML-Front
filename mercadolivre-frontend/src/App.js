import React from 'react';

import Header from './components/Header/Header';

import './App.scss';

export default function App(props) {
  return (
    <div>
      <Header />
      <div className="app-content">{props.children}</div>
    </div>
  );
}
