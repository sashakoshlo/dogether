import React from "react";
import Tasks from "./Tasks";
import { connect } from "react-redux";
import AddTask from './AddTask';
import { showClosedTasks, hideClosedTasks } from '../actions/filters/filters';

const Project = ({ projects, selectedProject, tasks, closedTasksVisible, dispatch }) => (
  <div className="col">
    <div className="project-details-header row align-items-center">
      <div className="project-details-header__title col-12 col-md">
        <img src="./images/projecticon.png" alt="Project icon" />
        <h1>{selectedProject.name}</h1>
      </div>
      <div className="col col-md-auto row">
        <div className="col project-details-header__button-container">
          <AddTask projectId={selectedProject.id} />
        </div>
        <div className="col-auto project-details-header__button-container">
          {closedTasksVisible ?
            <button onClick={() => { dispatch(hideClosedTasks()) }} className="project-details-header__secondary-action col">Hide Closed Tasks</button>
            :
            <button onClick={() => { dispatch(showClosedTasks()) }} className="project-details-header__secondary-action col">Show Closed Tasks</button>
          }
        </div>
      </div>
    </div>
    <div className="col tasks-container justify-content-center">
      <Tasks />
    </div>
  </div>
);

const mapStateToProps = state => ({
  selectedProject: state.projects.find(project => project.id === state.selected.selectedProject),
  tasks: state.tasks,
  closedTasksVisible: state.filters.closedTasksVisible
});

export default connect(mapStateToProps)(Project);
