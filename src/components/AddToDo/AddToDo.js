import React from 'react';
import PropTypes from 'prop-types';

import './addToDo.css';

class AddToDo extends React.Component {
    state = {
        inputStr : ''
    };

    updateState = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    addTodo = () => {
        this.props.addToDo(this.state.inputStr);
        this.setState({
            inputStr : ''
        });
    };

    render() {
        return (
            <div className="search-bar">
                <input type="text" className="add-text" id='inputStr' onChange={this.updateState} value={this.state.inputStr}/>
                <button
                    type="submit"
                    className='add-submit'
                    id='submit'
                    onClick={this.addTodo}
                >Add Todo</button>
            </div>
        );
    }
}

AddToDo.propTypes = {
    addToDo : PropTypes.func.isRequired
};

export default AddToDo;