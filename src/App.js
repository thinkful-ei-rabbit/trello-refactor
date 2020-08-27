import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

/*
For the "Add Random Card" button, you can use this function to generate a random new card inside the event handler before adding it to state:
*/

const newRandomCard = () => {
  console.log('ran newRandomCard');
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

/*
To remove key value pairs from an object you can use the omit function below, which returns a new object:
*/

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

// Example
// const objectWithKVPs = {
//   key: 'value',
//   foo: 'foo value',
//   bar: 'bar value',
//   abc: { nested: 'object' }
// }

// // To remove the foo key value pair
// const newObjectWithKVPs = omit(objectWithKVPs, 'foo');


class App extends Component {
  state = {
    store: STORE

    };

    handleDelete = (cardId) => {
      const { lists, allCards} = this.state.store
      const cardList = lists.map(list => ({
        ...list,
        cardIds: list.cardIds.filter(id => id !== cardId)
      }))
      const newCardList = omit(allCards, cardId)
      this.setState({
        store: {
          lists: cardList,
          allCards: newCardList,
        }
      })
    }

    handleAddCard = (id) => {
      const newCard = newRandomCard();
      const newList = this.state.store.lists.map(list => {
        if(list.id === id) {
          return {
            ...list, 
            cardIds: [ ...list.cardIds, newCard.id ]
          }
        }
        return list
      })
      this.setState({
        store: {
          lists: newList,
          allCards: {
            ...this.state.store.allCards,
            [newCard.id]: newCard
          }
        }
      })
      
    }
    
    

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteClick={this.handleDelete}
              onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
