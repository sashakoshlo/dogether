import React from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import AddTask from './AddTask';

const Tasks = ({ tasks, boardId }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        if (task.status !== 'Closed') {
          return <Task key={task.id} task={task} />
        }
      })}
      <AddTask boardId={boardId} />
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.filter(task => task.boardId === props.boardId)
});

export default connect(mapStateToProps)(Tasks);
