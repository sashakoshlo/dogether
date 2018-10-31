import React from "react";
import { connect } from "react-redux";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import Project from './Project';

class DogetherApp extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row main">
          <div className="left-panel col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
            <div className="left-panel__header row align-items-center">
              <h3 className="col-auto">
                DG
                </h3>
              <h2 className="col">
                <b>Do</b>
                gether
                </h2>
              <button className="left-panel__header-button--visible-xs col-auto" data-toggle="collapse" data-target=".sidebar-collapse">
                <i className="fas fa-bars"></i>
              </button>
            </div>

            <div className="collapse left-panel__projects--dont-collapse-sm sidebar-collapse show">
              <AddProject />
              {<ProjectList />}
            </div>

          </div>
          <div className="main-panel col-12 col-sm-7 col-md-8 col-lg-9 col-xl-10">
            {this.props.selectedProject && <Project />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
});

export default connect(mapStateToProps)(DogetherApp);
