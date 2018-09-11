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
    <div>
      <button type="button" onClick={this.handleShowForm} className="startNewProject">
        Start New Project
      </button>
      {this.state.formVisible && (
        <div className="startNewProject__form">
          <input
            type="text"
            id="projectName"
            placeholder="Project Name"
            autoFocus
          />
          <button type="submit" onClick={this.handleAddProject}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(AddProject);
