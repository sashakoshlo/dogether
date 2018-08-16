import React from 'react';
import Projects from './Projects';
import AddProject from './AddProject';
import TaskModal from './TaskModal';
import Boards from './Boards';
import update from 'immutability-helper';

export default class DogetherApp extends React.Component {
  handleAddProject = (projectName) => {
    this.setState((prevState) => {
      let projects = prevState.projects;
      let newProject = {
        id: prevState.projects.length,
        name: projectName,
        boards: []
      }
      return {
        projects: [...prevState.projects, newProject]
      }
    });
  }
  handleEditProject = (projectName, projectId) => {
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [projectId]: {
                                              name: {$set: projectName}
                                            }
                                          }});
      return newState;
    });
  }
  handleDeleteProject = (projectId) => {
    if (projectId === this.state.selectedProject) {
      this.setState(() => ({
        selectedProject: -1
      }));
    }
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            $splice: [[projectId, 1]]}
      });
      return newState;
    });
  } 
  handleAddBoard = (boardName) => {
    this.setState((prevState) => {
      const newBoard = {
        name: boardName,
        tasks: []
      }
      const selectedProject = prevState.selectedProject;
      const newState = update(prevState, {projects: {
                                            [selectedProject]: {
                                              boards: {$push: [newBoard]}
                                            }
      }});
      return newState;
    });
  }
  handleEditBoard = (boardId, boardName) => {
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                [boardId]: {
                                                  name: {$set: boardName}
                                                }
                                              }
                                            }
      }});
      return newState;
    });
  }
  handleDeleteBoard = (boardId) => {
    console.log(boardId);
    if (boardId === this.state.selectedBoard) {
      this.setState(() => ({
        selectedBoard: -1
      }));
    }
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                $splice: [[boardId, 1]]
                                              }
                                            }}
      });
      return newState;
    });
  } 
  handleRenderBoards = (projectId) => {
    this.setState(() => ({
      selectedProject: projectId
    }));
  }
  handleSelectBoard = (boardId) => {
    this.setState(() => ({
      selectedBoard: boardId
    }))
  }
  handleAddTask = (boardId, taskName, dueDate) => {
    this.setState((prevState) => {
      let newTask = {
        name: taskName,
        dueDate: dueDate,
        status: 'Open' 
      }
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                [boardId]: {
                                                  tasks: {$push: [newTask]}
                                                }
                                              }
                                            }
      }});
      return newState;
    });
  }
  handleEditTask = (boardId, taskId, taskName, dueDate) => {
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                [boardId]: {
                                                  tasks: {
                                                    [taskId]: {
                                                      name: {$set: taskName},
                                                      dueDate: {$set: dueDate}
                                                    }
                                                  }
                                                }
                                              }
                                            }
      }});
      return newState;
    });
  }
  handleChangeTaskStatus = (boardId, taskId, status) => {
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                [boardId]: {
                                                  tasks: {
                                                    [taskId]: {
                                                      status: {$set: status}
                                                    }
                                                  }
                                                }
                                              }
                                            }
      }});
      return newState;
    });
  }
  handleDeleteTask = (boardId, taskId) => {
    console.log(taskId);
    if (taskId === this.state.selectedTask) {
      this.setState(() => ({
        selectedTask: -1
      }));
    }
    this.setState((prevState) => {
      const newState = update(prevState, {projects: {
                                            [prevState.selectedProject]: {
                                              boards: {
                                                [boardId]: {
                                                  tasks: {
                                                    $splice: [[taskId, 1]]
                                                  }
                                                }
                                              }
                                            }}
      });
      return newState;
    });
  } 
  handleIsEditingOn = () => {
    this.setState(() => ({
      isEditingTask: true
    }));
  }
  handleIsEditingOff = () => {
    this.setState(() => ({
      isEditingTask: false
    }));
  }
  handleSelectTask = (taskId) => {
    this.setState(() => ({
      selectedTask: taskId
    }));
  }
  handleUnselectTask = () => {
    this.setState(() => ({
      selectedTask: -1
    }));
  }
  handleOpenTaskModal = () => {
    this.setState(() => ({
      taskModalIsOpen: true
    }));
  }
  handleCloseTaskModal = () => {
    this.setState(() => ({
      taskModalIsOpen: false
    }));
  }
  componentDidMount = () => {
    try {
      const json = localStorage.getItem('projects');
      const projects = JSON.parse(json);
      if (projects) {
        this.setState(() => ({projects}));
      }
    } catch(e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.projects !== prevState.projects) {
      const json = JSON.stringify(this.state.projects);
      localStorage.setItem('projects', json);
    }
  }
  state = {
    projects: [],
    selectedProject: -1,
    selectedBoard: -1,
    selectedTask: -1,
    taskModalIsOpen: false,
    isEditingTask: false
  }
  render() {
    return (
      <div>
        <div className="main">
          <div className="leftPanel">
            <div className="header">
              <img src="./images/logo.png" alt="Logo"/>
              <h1><b>Do</b>gether</h1>
            </div>
            <AddProject handleAddProject={this.handleAddProject} />
            <Projects
              projects = {this.state.projects}
              selectedProject = {this.state.selectedProject}
              handleEditProject = {this.handleEditProject}
              handleDeleteProject = {this.handleDeleteProject}
              handleRenderBoards = {this.handleRenderBoards}
              handleAddBoard = {this.handleAddBoard}
              handleOpenTaskModal = {this.handleOpenTaskModal}
              handleSelectBoard = {this.handleSelectBoard}
            />
          </div>
          <div className="mainPanel">
            {this.state.selectedProject >= 0 && 
              <Boards
                projectName = {this.state.projects[this.state.selectedProject].name}
                boards = {this.state.projects[this.state.selectedProject].boards}
                handleAddBoard = {this.handleAddBoard}
                handleEditBoard = {this.handleEditBoard}
                handleDeleteBoard = {this.handleDeleteBoard}
                handleSelectBoard = {this.handleSelectBoard}
                handleOpenTaskModal = {this.handleOpenTaskModal}
                handleIsEditingOn = {this.handleIsEditingOn}
                handleIsEditingOff = {this.handleIsEditingOff}
                handleSelectTask = {this.handleSelectTask}
                handleUnselectTask = {this.handleUnselectTask}
                handleChangeTaskStatus = {this.handleChangeTaskStatus}
                handleDeleteTask = {this.handleDeleteTask}
              />
            }
          </div>
        </div>
        <TaskModal 
          taskModalIsOpen = {this.state.taskModalIsOpen}
          handleOpenTaskModal = {this.handleOpenTaskModal}
          handleCloseTaskModal = {this.handleCloseTaskModal}
          handleAddTask = {this.handleAddTask}
          handleEditTask = {this.handleEditTask}
          projects = {this.state.projects}
          selectedProject = {this.state.selectedProject}
          selectedBoard = {this.state.selectedBoard}
          selectedTask = {this.state.selectedTask}
          isEditingTask = {this.state.isEditingTask}
        />
      </div>
    )
  }
}