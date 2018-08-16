import React from 'react';

class Task extends React.Component {
  state = {
    editingStatus: false
  }
  onHandleEditTask = () => {
    this.props.handleSelectBoard(this.props.boardId);
    this.props.handleSelectTask(this.props.taskId);
    this.props.handleIsEditingOn();
    this.props.handleOpenTaskModal();
  }
  onHandleChangeStatus = () => {
    this.setState(() => ({
      editingStatus: true
    }));
  }
  onHandleSaveStatus = () => {
    const selectedOptionIndex = document.getElementById("statusDropdown").selectedIndex;
    const selectedOption = document.getElementById("statusDropdown").options[selectedOptionIndex].value;
    if (selectedOption) {
      this.props.handleChangeTaskStatus(this.props.boardId, this.props.taskId, selectedOption);
      this.setState(() => ({
        editingStatus: false
      }));
    } else {
      alert("Select status");
    }
  }
  onHandleCancelSave = (event) => {
    console.log(event.target);
    if (event.target !== document.getElementById("saveStatus") && (event.target !== document.getElementById("statusDropdown"))) {
      this.setState(() => ({
        editingStatus: false
      }));
    }
  }
  onHandleDeleteTask = () => {
    this.props.handleDeleteTask(this.props.boardId, this.props.taskId);
  }
  render = () => {
    return (
      <div className="task">
      <div className="taskHeader">
        <p>{this.props.task.name}</p>
        <div className="taskHeaderActions">
          <button onClick={this.onHandleEditTask}><i className="fas fa-pencil-alt"></i></button>
          <button onClick={this.onHandleDeleteTask}><i className="fas fa-trash"></i></button>
        </div>
      </div>
      <p>{this.props.task.dueDate}</p>
          {!this.state.editingStatus && 
            <div className="taskStatus">
              <p>{this.props.task.status}</p>
              <button onClick={this.onHandleChangeStatus}>Change Status</button>
            </div>
          }
          {this.state.editingStatus && 
            <div className="taskStatus">
              <select name="statuses" id="statusDropdown" autoFocus>
                <option value=""></option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <button onClick={this.onHandleSaveStatus} id="saveStatus">Save</button>
            </div>
          }
      </div>
    )
  }
}

export default Task;