import React from "react";
import "./styles.css";
import Form from "./form";
import List from "./list";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { todos: [] };
  }
  componentDidMount() {
    this.getTodos();
  }
  getTodos() {
    fetch("https://my-json-server.typicode.com/alaksandarjesus/todos-db/todos")
      .then(res => res.json())
      .then(response => {
        this.setState({ todos: response });
      });
  }
  render() {
    return (
      <div className="container">
        <Form />
        <List todos={this.state.todos} />
      </div>
    );
  }
}
