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
  };

  onHandleEditProject = () => {
    const projectName = document.getElementById("projectName").value;
    if (projectName) {
      this.props.dispatch(editProject(this.props.project.id, projectName));
      // const updatedProject = this.props.projects.find(project => project.id === this.props.selectedProject.id);
      // console.log(updatedProject);
      // this.props.dispatch(selectProject(updatedProject));
    }
    this.setState(() => ({
      editing: false,
    }));
  };

  onHandleDeleteProject = (event) => {
    event.stopPropagation();
    if (confirm("Delete the item?")) {
      if (this.props.selectedProject.id === this.props.project.id) {
        this.props.dispatch(selectProject());
      }
      const boards = this.props.boards.filter(board => board.projectId === this.props.project.id);
      boards.forEach(board => {
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
            </div>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  // projects: state.projects,
  boards: state.boards,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(Project);
