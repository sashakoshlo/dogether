import React from "react";
import { connect } from "react-redux";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Boards from './Boards';

class DogetherApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="container-fluid">
        <div className="row main">
          <div className="leftPanel col-2">
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
            {<Projects />}
          </div>
          <div className="mainPanel col">{this.props.selectedProject.id && <Boards />}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
});

export default connect(mapStateToProps)(DogetherApp);
