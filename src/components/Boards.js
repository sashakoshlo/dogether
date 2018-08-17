import React from 'react';
import Board from './Board';
import AddBoard from './AddBoard';

const Boards = props => (
  <div>
    <div className="projectHeader">
      <div className="projectTitle">
        <img src="./images/projecticon.png" alt="Project icon"/>
        <h1>{props.projectName}</h1>
      </div>
      <div className="projectActions">
        <button>Show Closed tasks</button>
      </div>
    </div>
    <div className="boards">
    <div className="existingBoards">
      {props.boards.map((board, index) => (
        <Board
          key={index}
          boardId = {index} 
          board={board}
          handleEditBoard = {props.handleEditBoard}
          handleDeleteBoard = {props.handleDeleteBoard}
          handleSelectBoard = {props.handleSelectBoard}
          handleOpenTaskModal = {props.handleOpenTaskModal}
          handleIsEditingOn = {props.handleIsEditingOn}
          handleIsEditingOff = {props.handleIsEditingOff}
          handleSelectTask = {props.handleSelectTask}
          handleUnselectTask = {props.handleUnselectTask}
          handleChangeTaskStatus = {props.handleChangeTaskStatus}
          handleDeleteTask = {props.handleDeleteTask}
        />
      ))}
    </div>
    <div>
      <AddBoard handleAddBoard = {props.handleAddBoard}/>
    </div>
    </div>
  </div>
);

export default Boards;
