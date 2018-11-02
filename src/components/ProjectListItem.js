import React from "react";
import { connect } from "react-redux";
import { editProject, removeProject } from "../actions/projects";
import { removeTask } from "../actions/tasks";
import { selectProject } from "../actions/filters/selected";
import { hideClosedTasks, setTextFilter } from "../actions/filters/filters";

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

  onHandleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onHandleEditProject(e);
    }
  }

  onHandleEditProject = (e) => {
    const projectName = e.target.value;
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
    this.props.dispatch(selectProject(this.props.project.id));
    this.props.dispatch(hideClosedTasks());
    this.props.dispatch(setTextFilter());
  };

  render = () => {
    const project = this.props.project;
    const id = project.id;
    const projectClass = this.props.selectedProject === id ? "selected-project-list-item" : "project-list-item";
    return (
      <div className={projectClass}>
        <div className="container-fluid">
          {!this.state.editing && (
            <div key={id} className="project row">
              {window.innerWidth > 576
                && (
                  <button
                    type="button"
                    id={id}
                    onClick={this.onHandleSelectProject}
                    className="project__name col"
                  >
                    {project.name}
                  </button>
                )
              }
              {window.innerWidth < 576
                && (
                  <button
                    type="button"
                    id={id}
                    onClick={this.onHandleSelectProject}
                    className="project__name col"
                    data-toggle="collapse"
                    data-target=".sidebar-collapse"
                  >
                    {project.name}
                  </button>
                )
              }
              <div className="col-auto project__actions">
                <button type="button" id={id} onClick={this.onHandleOpenEditForm}>
                  <i className="fas fa-pencil-alt project__actions__action" />
                </button>
                <button type="button" onClick={this.onHandleDeleteProject}>
                  <i className="fas fa-trash project__actions__action" />
                </button>
              </div>
            </div>
          )}
          {this.state.editing && (
            <div key={id} className="project row">
              <input
                type="text"
                id="projectName"
                defaultValue={project.name}
                autoFocus
                className="col project__input"
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
