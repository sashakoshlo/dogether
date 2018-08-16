import React from 'react';
import Tasks from './Tasks';

export default class Board extends React.Component {
  state = {
    editing: false,
    visible: true
  }
  onHandleToggleBoardVisibility = () => {
    this.setState((prevState) => {
      return prevState.visible ? {visible: false} : {visible: true}
    });
  }
  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true
    }));
  }
  onHandleSaveBoard = () => {
    let boardName = document.getElementById("boardName" + this.props.boardId).value;
    if (boardName && boardName !== this.props.board.name) {
      this.props.handleEditBoard(this.props.boardId, boardName);
    }
    this.setState(() => ({
      editing: false
    }));
  }
  onHandleDeleteBoard = () => {
    this.props.handleDeleteBoard(this.props.boardId);
  }
  render = () => {
    return (
    <div className="board">
      <div className="board-title">
      {!this.state.editing &&
        <div>
         <h4>{this.props.board.name}</h4>
          <button onClick = {this.onHandleOpenEditForm}><i className="fas fa-pencil-alt"></i></button>
          <button onClick = {this.onHandleDeleteBoard}><i className="fas fa-trash"></i></button>
        </div>
      }
      {this.state.editing && 
        <div>
          <input type="text" defaultValue={this.props.board.name} id={"boardName" + this.props.boardId}/>
          <button onClick = {this.onHandleSaveBoard}>Save</button>
        </div>
      }
      {this.state.visible && 
        <button onClick = {this.onHandleToggleBoardVisibility}><i className="fas fa-angle-up"></i></button>
      }
      {!this.state.visible && 
        <button onClick = {this.onHandleToggleBoardVisibility}><i className="fas fa-angle-down"></i></button>
      }
      </div>
      {this.state.visible &&
        <Tasks 
          boardId = {this.props.boardId}
          handleSelectBoard = {this.props.handleSelectBoard}
          tasksList = {this.props.board.tasks}
          handleOpenTaskModal = {this.props.handleOpenTaskModal}
          handleIsEditingOn = {this.props.handleIsEditingOn}
          handleIsEditingOff = {this.props.handleIsEditingOff}
          handleSelectTask = {this.props.handleSelectTask}
          handleUnselectTask = {this.props.handleUnselectTask}
          handleChangeTaskStatus = {this.props.handleChangeTaskStatus}
          handleDeleteTask = {this.props.handleDeleteTask}
        />
      }
    </div>)
  }
}
