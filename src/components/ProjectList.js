import React from "react";
import { connect } from "react-redux";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => (
  <div className="projects">
    <h3>PROJECTS</h3>
    {projects.map(project => <ProjectListItem project={project} key={project.id} />)}
  </div>
);

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(ProjectList);
