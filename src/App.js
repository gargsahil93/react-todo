import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Todos from "./components/Todos";
import TopNav from "./components/TopNav/TopNav";
import AddToDo from "./components/AddToDo/AddToDo";
import About from "./components/About/About";

import { v4 as uuid } from 'uuid';

import './App.css';

class App extends React.Component{
    state = {
      items : []
    };

    openConnection () {
        let request = indexedDB.open('todoDB', 1);
        request.addEventListener('success', (event) => {
          this.db = event.target.result;
          console.log('connection open');
          this.getAllTodos();
        });
        request.onupgradeneeded = function (event) {
          var db = event.target.result;
          var todoStore = db.createObjectStore("todos", {
              keyPath: 'id',
              autoIncrement: true
          });
          todoStore.createIndex("title", "title", { unique: true });
        };
    }

    getAllTodos () {
        let todos = [];
        this.db.transaction("todos", "readonly").objectStore("todos").openCursor().onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
              todos.push(cursor.value);
              cursor.continue();
          } else {
              this.setState({
                  items : todos
              });
          }
        };
    }

    componentDidMount() {
        this.openConnection();
    }

    checkBoxClicked = (id) => {
        this.setState({
          items : this.state.items.map(item => {
                      if (item.id === id) item.completed = !item.completed;
                      return item;
                  })
        });
        let store = this.db.transaction("todos", "readwrite").objectStore("todos");
        store.get(id).onsuccess = (event) => {
            let todo = event.target.result;
            todo.completed = true;
            store.put(todo);
        };
    };

    addToDO = (title) => {
        let store = this.db.transaction("todos", "readwrite").objectStore("todos");
        store.add({
          title,
          completed: false
        });
        this.setState({
          items : this.state.items.concat({
              id : uuid(),
              title,
              completed : false
          })
        });
    };

    render () {
        return (
            <Router>
                <div className="App main-content">
                    <TopNav />
                    <div style={{
                        width:'90%',
                        margin:'auto',
                        padding: '10px 0'
                    }}>
                        <Route exact path="/">
                            <AddToDo addToDo={this.addToDO}/>
                            <Todos
                                todoList={this.state.items}
                                checkBoxClicked={this.checkBoxClicked}
                            />
                        </Route>
                        <Route path="/about">
                            <About/>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
