import React from "react";
import { connect } from "react-redux";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { showClosedTasks, hideClosedTasks, setTextFilter } from "../actions/filters/filters";

class Project extends React.Component {
  state = {
    checked: false,
  };

  toggleClosedTasks = () => {
    if (this.state.checked) {
      this.props.dispatch(hideClosedTasks());
      this.setState(() => ({
        checked: false,
      }));
    } else {
      this.props.dispatch(showClosedTasks());
      this.setState(() => ({
        checked: true,
      }));
    }
  };

  render() {
    const {
      selectedProject, closedTasksVisible, textFilter, dispatch,
    } = this.props;
    return (
      <div className="col">
        <div className="project-details-header row align-items-center justify-content-between">
          <div className="project-details-header__title col-12 col-md-12 col-xl-2">
            <img src="./images/projecticon.png" alt="Project icon" />
            <h1>{selectedProject.name}</h1>
          </div>
          <div className="col-12 col-md col-xl-4 project-details-header__container">
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
          <div className="col col-md-auto row">
            <div className="col-auto project-details-header__container">
              <div className="row align-items-center project-details-header__secondary-action">
                <input
                  type="checkbox"
                  onChange={this.toggleClosedTasks}
                  value={this.state.checked}
                  id="closed-tasks-switch"
                  className="col-auto"
                />
                <span className="col-auto">Show Closed Tasks</span>
              </div>
            </div>
            <div className="col project-details-header__container">
              <AddTask projectId={selectedProject.id} />
            </div>
          </div>
        </div>
        <div className="col tasks-container justify-content-center">
          <Tasks />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.projects.find(project => project.id === state.selected.selectedProject),
  closedTasksVisible: state.filters.closedTasksVisible,
  textFilter: state.filters.text,
});

export default connect(mapStateToProps)(Project);
