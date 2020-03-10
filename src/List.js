import React from "react";
import  Confirm  from "./Confirm";
import { Constants } from "./Constants";

export default class List extends React.Component {
  todoForDelete = {};
  constructor(props) {
    super(props);
    this.state = {confirmText:''};
    this.onAgree = this.onAgree.bind(this)
  }

  componentDidMount() {}

  todosList() {
    return this.props.todos.map(todo => {
      return (
        <li key={todo.id} className="collection-item">
          {todo.title}
          <span className="right">
            <button
              className="waves-effect waves-teal btn-flat"
              onClick={event => this.onEdit(event, todo)}
            >
              <i className="material-icons">edit</i>
            </button>
            <button
              className="waves-effect waves-teal btn-flat"
              onClick={event => this.onDelete(event, todo)}
            >
              <i className="material-icons">delete_outline</i>
            </button>
          </span>
        </li>
      );
    });
  }

  onEdit(event, todo) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onEdit(todo);
  }
  onDelete(event, todo) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({confirmText:'Are you sure you want to remove this todo '+todo.title})
    this.todoForDelete = todo
  }

  onAgree(){
    console.log("todo For Delete", this.todoForDelete);
    fetch(Constants.baseUrl + '/todos/'+this.todoForDelete.id, {
      method: 'DELETE', // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log("success");
      })
      .catch(err => {
        console.log("err");
      });
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.todosList()}</ul>
        <Confirm confirmText={this.state.confirmText} onAgree={this.onAgree} />
      </div>
    );
  }
}
