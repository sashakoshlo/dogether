import React from 'react';

export default class Project extends React.Component {
  state = {
    editing: false
  }
  handleRenderBoards = () => {
    this.props.handleRenderBoards(this.props.id);
  }
  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true
    }));
  }
  onHandleSaveProject = () => {
    let projectName = document.getElementById('projectName').value;
    if (projectName) {
      this.props.handleEditProject(projectName, this.props.id);
    }
    this.setState(() => ({
      editing: false
    }));
  }
  onHandleDeleteProject = () => {
    if(confirm("Delete the item?")) {
      this.props.handleDeleteProject(this.props.id);
    }
  }
  render = () => {
    const projectClass = this.props.selectedProject === this.props.id ? "selectedProject" : "project";
    return (
      <div className={projectClass}  onClick={this.handleRenderBoards}>
        <div>
          {!this.state.editing && 
            <div key={this.props.id} className="projectButtons">
              <button id={this.props.id} className="projectName">
                {this.props.project.name}
              </button>
              <div>
                <button id={this.props.id} onClick={this.onHandleOpenEditForm}><i className="fas fa-pencil-alt"></i></button>
                <button onClick={this.onHandleDeleteProject}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          }
          {this.state.editing &&
            <div key={this.props.id} className="projectButtons">
              <input type="text" id="projectName" defaultValue={this.props.project.name}/>
              <button id={this.props.id} onClick={this.onHandleSaveProject}>Save</button>
            </div>
          }
        </div>
      </div>
    )
  }
}