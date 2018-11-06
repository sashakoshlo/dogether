import React from "react";
import { connect } from "react-redux";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { showClosedTasks, hideClosedTasks, setTextFilter } from "../actions/filters/filters";

const Project = ({
  selectedProject, closedTasksVisible, textFilter, dispatch,
}) => (
  <div className="col">
    <div className="project-details-header row align-items-center justify-content-between">
      <div className="project-details-header__title col-12 col-md-auto col-xl-2">
        <img src="./images/projecticon.png" alt="Project icon" />
        <h1>{selectedProject.name}</h1>
      </div>
      <div className="col-12 col-xl-4 order-1 order-md-2 order-xl-1">
        <input
          type="text"
          className="col project-details-header__search"
          placeholder="Search for tasks"
          value={textFilter}
          onChange={(e) => {
            dispatch(setTextFilter(e.target.value));
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
      </div>
      <div className="col col-md-auto row order-2 order-md-1 order-xl-2">
        <div className="col project-details-header__button-container">
          <AddTask projectId={selectedProject.id} />
        </div>
        <div className="col-auto project-details-header__button-container">
          {closedTasksVisible ? (
            <button
              type="button"
              onClick={() => {
                dispatch(hideClosedTasks());
              }}
              className="project-details-header__secondary-action col"
            >
              Hide Closed Tasks
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                dispatch(showClosedTasks());
              }}
              className="project-details-header__secondary-action col"
            >
              Show Closed Tasks
            </button>
          )}
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
  closedTasksVisible: state.filters.closedTasksVisible,
  textFilter: state.filters.text,
});

export default connect(mapStateToProps)(Project);
