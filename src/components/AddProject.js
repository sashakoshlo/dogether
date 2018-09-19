import React from "react";
import { connect } from "react-redux";
import { addProject } from "../actions/projects";

class AddProject extends React.Component {
  state = {
    formVisible: false,
  };

  handleShowForm = () => {
    this.setState(() => ({
      formVisible: true,
    }));
  };

  onHandleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddProject();
    }
  }

  handleAddProject = () => {
    const projectName = document.getElementById("projectName").value;
    if (projectName) {
      this.props.dispatch(addProject(projectName));
    }
    this.setState(() => ({
      formVisible: false,
    }));
  };

  render = () => (
    <div className="container-fluid">
      <div className="row add-project__form">
        <button type="button" onClick={this.handleShowForm} className="startNewProject col">
          Start New Project
      </button>
        {this.state.formVisible && (
          <div className="startNewProject__form row">
            <input
              type="text"
              id="projectName"
              placeholder="Project Name"
              autoFocus
              className="col"
              onKeyPress={this.onHandleKeyPress}
            />
            <button
              type="submit"
              onClick={this.handleAddProject}
              className="col-auto"
            >
              Save
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(AddProject);
