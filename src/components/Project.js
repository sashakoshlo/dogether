import React from "react";
import { connect } from "react-redux";
import { editProject, removeProject } from "../actions/projects";
import { selectProject } from "../actions/filters/selected";

class Project extends React.Component {
  state = {
    editing: false,
  };

  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true,
    }));
  };

  onHandleEditProject = () => {
    const projectName = document.getElementById("projectName").value;
    if (projectName) {
      this.props.dispatch(editProject(this.props.project.id, projectName));
    }
    this.setState(() => ({
      editing: false,
    }));
  };

  onHandleDeleteProject = () => {
    if (confirm("Delete the item?")) {
      this.props.dispatch(removeProject(this.props.project.id));
    }
  };

  onHandleSelectProject = () => {
    this.props.dispatch(selectProject(this.props.project));
  };

  render = () => {
    const project = this.props.project;
    const id = project.id;
    const projectClass = this.props.selectedProject.id === id ? "selectedProject" : "project";
    return (
      <div className={projectClass} onClick={this.onHandleSelectProject}>
        <div>
          {!this.state.editing && (
            <div key={id} className="projectButtons">
              <button id={id} className="projectName">
                {project.name}
              </button>
              <div>
                <button id={id} onClick={this.onHandleOpenEditForm}>
                  <i className="fas fa-pencil-alt" />
                </button>
                <button onClick={this.onHandleDeleteProject}>
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          )}
          {this.state.editing && (
            <div key={id} className="projectButtons">
              <input
                type="text"
                id="projectName"
                defaultValue={project.name}
                autoFocus
              />
              <button id={id} onClick={this.onHandleEditProject}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
});

export default connect(mapStateToProps)(Project);
