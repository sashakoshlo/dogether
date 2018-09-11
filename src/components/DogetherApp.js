import React from "react";
import { connect } from "react-redux";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Boards from './Boards';

class DogetherApp extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main">
          <div className="leftPanel">
            <div className="header">
              <img src="./images/logo.png" alt="Logo" />
              <h1>
                <b>Do</b>
                gether
              </h1>
            </div>
            <AddProject />
            {<Projects />}
          </div>
          <div className="mainPanel">{this.props.selectedProject.id && <Boards />}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
});

export default connect(mapStateToProps)(DogetherApp);
