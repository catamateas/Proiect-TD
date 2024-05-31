import React from 'react';
import './App.css';
import TodoListManager from './components/TodoListManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List Application</h1>
      </header>
      <main>
        <TodoListManager />
      </main>
    </div>
  );
}

export default App;
