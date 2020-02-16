import React from 'react';
import Header from './header';
import Footer from './footer';


export default class MainArea extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      todos: [
        {label: "Todo1"},
        {label: "Todo2"},
        {label: 'Todo3'},
        {label: 'Todo4'},
        {label: 'Todo5'},
      ]
    }
  }

  renderTodoItems(){
    let todoItemDom =[];

    for(var i =0; i < this.state.todos.length; i++){
      let todoIem = <li className="todo-list-item" key={"item-" +i}>{this.state.todos[i].label}</li>
      todoItemDom.push(todoIem);
    }
    return todoItemDom;
  }

  render(){

    return (
      <div className="main-area">
      <Header />
      <main className="list-area">
      <ul className ="todo-list">
      {this.renderTodoItems()}
      </ul>
      </main>
      <Footer />
      </div>
    )
  }
}
