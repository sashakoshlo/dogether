import React from 'react';

export default class AddTask extends React.Component {
  onHandleAddTask = () => {
    this.props.handleIsEditingOff();
    this.props.handleUnselectTask();
    this.props.handleOpenTaskModal();
    this.props.handleSelectBoard(this.props.boardId);
  }
  render = () => {
    return (
      <div className="addTask">
        <button onClick={this.onHandleAddTask}>+ New Task</button>
      </div>
    )
  }
}