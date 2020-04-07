import React from "react";
import PropTypes from 'prop-types';

class Todo extends React.Component {
    render() {
        const { id, title, completed } = this.props.todo;
        return (
            <div>
                <input
                    type="checkbox"
                    onChange={this.props.checkBoxClicked.bind(this, id)}
                    checked={completed}
                />
                <span style={this.getStyle()}>
                    {title}
                </span>
            </div>
        );
    }

    getStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 'line-through' : '',
            paddingLeft: '5px'
        }
    }
}

Todo.propTypes = {
    todo : PropTypes.object.isRequired,
    checkBoxClicked : PropTypes.func.isRequired
};



export default Todo;