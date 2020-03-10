import React from "react";
import "./styles.css";
import Form from "./Form";
import List from "./List";
import { Constants } from "./Constants";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { todos: [] };
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
        console.error("error fetching json");
        this.setState({ todos: [] });
      });
  }
  render() {
    return (
      <div className="container">
        <Form />
        <List todos={this.state.todos} updateList={this.getTodos} />
      </div>
    );
  }
}
