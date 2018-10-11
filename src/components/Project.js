import React from "react";
import Tasks from "./Tasks";
import { connect } from "react-redux";
import AddTask from './AddTask';
import { showClosedTasks, hideClosedTasks } from '../actions/filters/filters';

const Project = ({ selectedProject, tasks, closedTasksVisible, dispatch }) => (
  <div className="col">
    <div className="projectHeader row align-items-center">
      <div className="projectTitle col-12 col-lg">
        <img src="./images/projecticon.png" alt="Project icon" />
        <h1>{selectedProject.name}</h1>
      </div>
      <div className="col-12 col-lg-auto">
        <AddTask projectId={selectedProject.id} />
      </div>
      <div className="projectActions col-12 col-lg-auto">
        {closedTasksVisible ?
          <button onClick={() => { dispatch(hideClosedTasks()) }}>Hide Closed Tasks</button>
          :
          <button onClick={() => { dispatch(showClosedTasks()) }}>Show Closed Tasks</button>
        }
      </div>
    </div>
    <div className="col tasks-container justify-content-center">
      <Tasks />
    </div>
  </div>
);

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  tasks: state.tasks,
  closedTasksVisible: state.filters.closedTasksVisible
});

export default connect(mapStateToProps)(Project);
