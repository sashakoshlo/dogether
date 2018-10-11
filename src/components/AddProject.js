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

  handleHideForm = () => {
    this.setState(() => ({
      formVisible: false,
    }));
  }

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
    handleHideForm();
  };

  render = () => (
    <div className="container-fluid">
      {!this.state.formVisible && (
        <div className="row add-project__form">
          <button type="button" onClick={this.handleShowForm} className="startNewProject col">
            Start New Project
      </button>
        </div>
      )}
      {this.state.formVisible && (
        <div className="add-project__form row">
          <input
            type="text"
            id="projectName"
            placeholder="Project Name"
            autoFocus
            className="col-12"
            onKeyPress={this.onHandleKeyPress}
            onBlur={this.handleHideForm}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(AddProject);
