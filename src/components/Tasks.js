import React from 'react';
import Task from './Task';
import AddTask from './AddTask';

const Tasks = (props) => {
  return (
    <div>
      {props.tasksList.map((task, index) => {
        if (task.status !== 'Closed') {
          return <Task 
            key={index} 
            task={task} 
            taskId = {index}
            boardId = {props.boardId}
            handleIsEditingOn = {props.handleIsEditingOn}
            handleSelectBoard = {props.handleSelectBoard}
            handleSelectTask = {props.handleSelectTask}
            handleOpenTaskModal = {props.handleOpenTaskModal}
            handleChangeTaskStatus = {props.handleChangeTaskStatus}
            handleDeleteTask = {props.handleDeleteTask}
          />
       }
      })}
      <AddTask 
        handleOpenTaskModal = {props.handleOpenTaskModal} 
        boardId = {props.boardId}
        handleSelectBoard = {props.handleSelectBoard}
        handleIsEditingOff = {props.handleIsEditingOff}
        handleUnselectTask = {props.handleUnselectTask}
      />
    </div>
  )
}

export default Tasks;