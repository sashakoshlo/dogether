import React from 'react';

export default class AddProject extends React.Component {
  state = {
    formVisible: false
  }
  handleShowForm = () => {
    this.setState(() => ({
      formVisible: true
    }));
  }
  handleAddProject = () => {
    let projectName = document.getElementById('projectName').value;
    if (projectName) {
      this.props.handleAddProject(projectName);
    }
    this.setState(() => ({
      formVisible: false
    }));
  }
  render = () => (
    <div>
      <button onClick={this.handleShowForm} className="startNewProject">Start New Project</button>
      {this.state.formVisible && 
        <div className="startNewProject__form">
          <input type="text" id="projectName" placeholder="Project Name"/>
          <button onClick={this.handleAddProject}>Save</button>
        </div>
      }
    </div>
  )
}