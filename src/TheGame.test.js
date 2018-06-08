import React from 'react';
import ReactDOM from 'react-dom';
import TheGame from './TheGame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TheGame />, div);
});
