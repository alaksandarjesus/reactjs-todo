import React from "react";
import "./styles.css";
import Form from "./Form";
import List from "./List";
import { Constants } from "./Constants";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { todos: [] };
    this.getTodos = this.getTodos.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }
  getTodos() {
    console.log("i am call");
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
  testFn() {
    console.log("i am called at testFn");
  }
  render() {
    return (
      <div className="container">
        <Form updateList={this.getTodos} />
        <List todos={this.state.todos} />
      </div>
    );
  }
}
