import React from "react";

const todosList = todos => {
  return todos.map(todo => {
    return (
      <li key={todo.id} className="collection-item">
        {todo.title}
      </li>
    );
  });
};

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <ul className="collection">{todosList(this.props.todos)}</ul>;
  }
}
