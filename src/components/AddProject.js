import React from "react";
import { connect } from "react-redux";
import { addProject } from "../actions/projects";
import { selectProject } from "../actions/filters/selected";

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

  onHandleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleAddProject(e);
    }
  }

  handleAddProject = (e) => {
    const projectName = e.target.value;
    if (projectName) {
      const project = this.props.dispatch(addProject(projectName)).project;
      this.props.dispatch(selectProject(project.id));
    }
    this.handleHideForm();
  };

  render = () => (
    <div className="container-fluid">
      {!this.state.formVisible && (
        <div className="row add-project">
          <button type="button" onClick={this.handleShowForm} className="add-project__button col">
            Start New Project
          </button>
        </div>
      )}
      {this.state.formVisible && (
        <div className="add-project row">
          <input
            type="text"
            id="projectName"
            placeholder="Project Name"
            autoFocus
            className="add-project__input col-12"
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
