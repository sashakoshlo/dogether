import React from 'react';
import Tasks from './Tasks';
import { connect } from 'react-redux';
import { editBoard, removeBoard } from '../actions/boards';
import { removeTask } from '../actions/tasks';

class Board extends React.Component {
  state = {
    editing: false
  };

  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true
    }));
  };

  onHandleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onHandleSaveBoard();
    }
  };

  onHandleSaveBoard = () => {
    const boardName = document.getElementById("boardName" + this.props.board.id).value;
    if (boardName && boardName !== this.props.board.name) {
      this.props.dispatch(editBoard(this.props.board.id, { name: boardName }));
    }
    this.setState(() => ({
      editing: false
    }));
  };

  onHandleDeleteBoard = () => {
    this.props.tasks.filter(task => task.boardId === this.props.board.id)
      .forEach(task => this.props.dispatch(removeTask(task.id)));
    this.props.dispatch(removeBoard(this.props.board.id));
  };

  render = () => {
    return (
      <div className="board col-4">
        <div>
          {!this.state.editing &&
            <div className="row board-header align-items-center justify-content-center">
              <h4 className="col">{this.props.board.name}</h4>
              <div className="col-auto">
                <button onClick={this.onHandleOpenEditForm}><i className="fas fa-pencil-alt"></i></button>
                <button onClick={this.onHandleDeleteBoard}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          }
          {this.state.editing &&
            <div className="row board-header align-items-center justify-content-center">
              <input
                type="text"
                defaultValue={this.props.board.name}
                id={"boardName" + this.props.board.id}
                autoFocus
                onKeyPress={this.onHandleKeyPress}
                className="col-12"
              />
            </div>
          }
        </div>
        <Tasks boardId={this.props.board.id} />
      </div>);
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
});

export default connect()(Board);
