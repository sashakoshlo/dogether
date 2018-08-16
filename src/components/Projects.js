import React from 'react';
import Project from './Project';

export default class Projects extends React.Component {
  render() {
    return (
      <div className="projects">
        <h3>PROJECTS</h3>
        {this.props.projects.map((project, index) => 
          <Project 
            key={index} 
            project={project} 
            selectedProject={this.props.selectedProject}
            handleEditProject = {this.props.handleEditProject}
            handleDeleteProject = {this.props.handleDeleteProject}
            id={index}
            handleRenderBoards = {this.props.handleRenderBoards}
            handleAddBoard = {this.props.handleAddBoard}
            handleSelectBoard = {this.props.handleSelectBoard}
            handleOpenTaskModal = {this.props.handleOpenTaskModal}
          />)}
      </div>
    )
  }
}