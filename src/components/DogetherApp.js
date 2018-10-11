import React from "react";
import { connect } from "react-redux";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import Project from './Project';

class DogetherApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="container-fluid">
        <div className="row main">
          <div className="leftPanel col-12 col-sm-5 col-lg-3 col-xl-2">
            <div className="header row">
              <h2 className="col-auto">
                DG
              </h2>
              <h1 className="col-auto">
                <b>Do</b>
                gether
              </h1>
            </div>
            <AddProject />
            {<ProjectList />}
          </div>
          <div className="mainPanel col-12 col-sm-7 col-lg-9 col-xl-10">{this.props.selectedProject.id && <Project />}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
});

export default connect(mapStateToProps)(DogetherApp);
