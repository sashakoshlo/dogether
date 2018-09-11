import React from 'react';
import Tasks from './Tasks';
import { connect } from 'react-redux';
import { editBoard, removeBoard } from '../actions/boards';

class Board extends React.Component {
  state = {
    editing: false
  }

  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true
    }));
  }

  onHandleSaveBoard = () => {
    const boardName = document.getElementById("boardName" + this.props.board.id).value;
    if (boardName && boardName !== this.props.board.name) {
      this.props.dispatch(editBoard(this.props.board.id, { name: boardName }));
    }
    this.setState(() => ({
      editing: false
    }));
  }

  onHandleDeleteBoard = () => {
    this.props.dispatch(removeBoard(this.props.board.id));
  }

  render = () => {
    return (
      <div className="board">
        <div className="board-title">
          {!this.state.editing &&
            <div>
              <h4>{this.props.board.name}</h4>
              <button onClick={this.onHandleOpenEditForm}><i className="fas fa-pencil-alt"></i></button>
              <button onClick={this.onHandleDeleteBoard}><i className="fas fa-trash"></i></button>
            </div>
          }
          {this.state.editing &&
            <div>
              <input
                type="text"
                defaultValue={this.props.board.name}
                id={"boardName" + this.props.board.id}
                autoFocus
              />
              <button onClick={this.onHandleSaveBoard}>Save</button>
            </div>
          }
        </div>
        <Tasks boardId={this.props.board.id} />
      </div>);
  }
}

export default connect()(Board);
