import React from "react";
import M from "materialize-css";
import { Constants } from "./Constants";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: { id: 0, title: "" }, disabled: false };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {}
  onSubmit() {
    const now = new Date();
    const todo = JSON.parse(JSON.stringify(this.state.todo));
    todo.id = now.getTime();
    todo.userId = 1;
    todo.completed = false;
    // this.setState({ disabled: true });
    fetch(Constants.baseUrl + "/todos", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(response => {
        console.log("success");
        this.props.updateList();
      })
      .catch(err => {
        console.log("err");
        this.props.updateList();
      });
  }
  handleChange(event) {
    const todo = JSON.parse(JSON.stringify(this.state.todo));
    todo.title = event.target.value;
    this.setState({ todo: todo });
  }
  render() {
    return (
      <div>
        <div className="input-field col s12">
          <input
            type="text"
            value={this.state.todo.title}
            onChange={this.handleChange}
          />
          <label>Todo</label>
        </div>
        <div className="row">
          <button
            onClick={this.onSubmit}
            className="btn waves-effect waves-light col s12"
            type="button"
            disabled={this.state.disabled}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
