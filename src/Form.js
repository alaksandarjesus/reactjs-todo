import React from "react";
import M from "materialize-css";
import { Constants } from "./Constants";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: { id: 0, title: "" }, disabled: false, error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.todoRef = React.createRef();
  }
  componentDidMount() {
    console.log("on mount", this.props.todo);
  }
  componentDidUpdate() {
    const todo = this.props.todo;
    if (todo.id && this.state.todo.id !== todo.id) {
      this.setState({ todo: todo });
      this.todoRef.current.focus();
      M.updateTextFields();
    }
  }
  validTodo(todo) {
    this.setState({ error: "" });
    if (!todo.title) {
      this.setState({ error: "Title is required" });
      return false;
    }
    if (todo.title.length < 3) {
      this.setState({ error: "Title should be minimum 3 characters" });
      return false;
    }
    if (todo.title.length > 20) {
      this.setState({ error: "Title cannot exceed 20 characters" });
      return false;
    }
    return true;
  }
  onSubmit() {
    const now = new Date();
    const todo = JSON.parse(JSON.stringify(this.state.todo));
    if (!this.validTodo(todo)) {
      return;
    }
    todo.userId = 1;
    todo.completed = false;
    this.setState({ disabled: true });
    let method = "POST";
    let path = "/todos";
    if (todo.id) {
      method = "PUT";
      path += "/" + todo.id;
    } else {
      todo.id = now.getTime();
    }
    fetch(Constants.baseUrl + path, {
      method: method, // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(response => {
        console.log("success");
        this.setState({ disabled: false });
        this.setState({ todo: {} });
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
    this.validTodo(todo);
  }
  render() {
    return (
      <div>
        <div className="input-field col s12">
          <input
            className="validate"
            ref={this.todoRef}
            type="text"
            value={this.state.todo.title}
            onChange={this.handleChange}
          />
          <label>Todo</label>
          <span className="helper-text red-text text-danger-4">
            {this.state.error}
          </span>
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
