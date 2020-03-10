import React from "react";
import "./styles.css";
import Form from "./Form";
import List from "./List";
import { Constants } from "./Constants";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { todos: [], todo:{} };
    this.getTodos = this.getTodos.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }
  getTodos() {
    fetch(Constants.baseUrl + "/todos")
      .then(res => res.json())
      .then(response => {
        this.setState({ todos: response });
      })
      .catch(err => {
        console.error("error fetching json", err);
        this.setState({ todos: [] });
      });
  }
  onEdit(todo){
    this.setState({todo:todo})
  }
  render() {
    return (
      <div className="container">
        <Form updateList={this.getTodos} todo={this.state.todo}/>
        <List todos={this.state.todos} onEdit={this.onEdit}/>
      </div>
    );
  }
}
