import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import renderer from 'react-test-renderer';

describe('myCard', () => {
  // above line starts the wrapper for test suite

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Card />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Card title="Card" content = "content"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });

  
    // this ends the test suite wrapper for 'myCard'
  });