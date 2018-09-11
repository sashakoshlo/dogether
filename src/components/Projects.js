import React from "react";
import { connect } from "react-redux";
import Project from "./Project";

const Projects = ({ projects }) => (
  <div className="projects">
    <h3>PROJECTS</h3>
    {projects.map(project => <Project project={project} key={project.id} />)}
  </div>
);

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(Projects);
