import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: { title: "" } };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log("i am called", this.state.todo);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ todo: { title: event.target.value } });
  }
  render() {
    return (
      <div>
        <div className="input-field col s12">
          <input
            id="todo"
            type="text"
            value={this.state.todo.title}
            onChange={this.handleChange}
          />
          <label htmlFor="todo">Todo</label>
        </div>
        <div className="row">
          <button
            onClick={this.onSubmit}
            className="btn waves-effect waves-light col s12"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
