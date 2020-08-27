import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

describe('myList', () => {
  // above line starts the wrapper for test suite, put tests below

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List header ={[]} cards = {[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<List header ={[]} cards = {[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });

  
  
    // this ends the test suite wrapper for 'myCard'
  });