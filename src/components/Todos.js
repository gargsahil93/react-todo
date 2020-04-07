import React from "react";
import PropTypes from 'prop-types';

import Todo from "./Todo";

export default class Todos extends React.Component {
    render () {
        return this.props.todoList.map(todo => {
            return (
                <Todo key={todo.id} todo={todo} checkBoxClicked={this.props.checkBoxClicked}/>
            )
        });
    }
}
Todos.propTypes = {
    todoList : PropTypes.array.isRequired,
    checkBoxClicked : PropTypes.func.isRequired
}