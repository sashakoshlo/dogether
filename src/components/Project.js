import React from "react";
import { connect } from "react-redux";
import { editProject, removeProject } from "../actions/projects";
import { removeBoard } from '../actions/boards';
import { removeTask } from '../actions/tasks';
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
    this.setState(() => ({
      editing: false,
    }));
  };

  onHandleDeleteProject = () => {
    if (confirm("Delete the item?")) {
      this.props.dispatch(selectProject());
      console.log(this.props.boards);
      this.props.boards.forEach(board => {
        const tasks = this.props.tasks.filter(task => task.boardId === board.id);
        console.log(tasks);
        tasks.forEach(task => this.props.dispatch(removeTask(task.id)));
        this.props.dispatch(removeBoard(board.id));
      });
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
              />
              <button id={id} onClick={this.onHandleEditProject} className="col-auto project-action">
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
  boards: state.boards.filter(board => board.projectId === state.selected.selectedProject.id),
  tasks: state.tasks,
});

export default connect(mapStateToProps)(Project);
