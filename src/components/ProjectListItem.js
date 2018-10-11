import React from "react";
import { connect } from "react-redux";
import { editProject, removeProject } from "../actions/projects";
import { removeTask } from '../actions/tasks';
import { selectProject } from "../actions/filters/selected";
import { hideClosedTasks } from '../actions/filters/filters';

class Project extends React.Component {
  state = {
    editing: false,
  };

  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true,
    }));
  };

  onHandleCloseEditForm = () => {
    this.setState(() => ({
      editing: false,
    }));
  }

  onHandleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onHandleEditProject();
    }
  }

  onHandleEditProject = () => {
    const projectName = document.getElementById("projectName").value;
    if (projectName) {
      this.props.dispatch(editProject(this.props.project.id, projectName));
    }
    this.onHandleCloseEditForm();
  };

  onHandleDeleteProject = () => {
    if (confirm("Delete the item?")) {
      this.props.dispatch(selectProject());
      const tasks = this.props.tasks.filter(task => task.projectId === this.props.project.id);
      tasks.forEach(task => this.props.dispatch(removeTask(task.id)));
      this.props.dispatch(removeProject(this.props.project.id));
    }
  };

  onHandleSelectProject = () => {
    this.props.dispatch(selectProject(this.props.project));
    this.props.dispatch(hideClosedTasks());
  };

  render = () => {
    const project = this.props.project;
    const id = project.id;
    const projectClass = this.props.selectedProject.id === id ? "selectedProject" : "project";
    return (
      <div className={projectClass} onClick={this.onHandleSelectProject}>
        <div className="container-fluid">
          {!this.state.editing && (
            <div key={id} className="projectButtons row">
              <button id={id} className="projectName col">
                {project.name}
              </button>
              <div className="col-auto project-actions">
                <button id={id} onClick={this.onHandleOpenEditForm}>
                  <i className="fas fa-pencil-alt project-action" />
                </button>
                <button onClick={this.onHandleDeleteProject}>
                  <i className="fas fa-trash project-action" />
                </button>
              </div>
            </div>
          )}
          {this.state.editing && (
            <div key={id} className="projectButtons row">
              <input
                type="text"
                id="projectName"
                defaultValue={project.name}
                autoFocus
                className="col project-field"
                onKeyPress={this.onHandleKeyPress}
                onBlur={this.onHandleCloseEditForm}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(Project);
