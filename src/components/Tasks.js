import React from "react";
import { connect } from "react-redux";
import Task from "./Task";
import getVisibleTasks from "../selectors/visibleTasks";

const Tasks = ({ tasks }) => (
  <div className="row justify-content-center">
    {tasks.map(task => <Task key={task.id} task={task} />)}
  </div>
);

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state.tasks, state.selected, state.filters),
});

export default connect(mapStateToProps)(Tasks);
