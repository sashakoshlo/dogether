import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class TaskModal extends React.Component {
  onHandleSubmit = () => {
    let taskName = document.getElementById("taskName").value;
    let dueDate = document.getElementById("taskDueDate").value;
    if (taskName !== '') {
      if (dueDate !== '') {
        if (this.props.isEditingTask) {
          this.props.handleEditTask(this.props.selectedBoard, this.props.selectedTask, taskName, dueDate);
        } else {
          this.props.handleAddTask(this.props.selectedBoard, taskName, dueDate);
        }
        this.props.handleCloseTaskModal();
      } else {
        alert('Enter the task due date');
      }
    } else {
      alert('Enter the task name');
    }
  }
  render = () => {
    return (
      <Modal
        className='modal'
        isOpen={this.props.taskModalIsOpen}
        onRequestClose={this.props.handleCloseTaskModal}
        contentLabel="Add Task"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {!this.props.isEditingTask &&
          <div className="modalFields">
            <h2>Create Task</h2>
            <div>
              <span>Task Name</span>
              <input type="text" id="taskName" />
            </div>
            <div>
              <span>Due date</span>
              <input type="date" id="taskDueDate" />
            </div>
          </div>
        }
        {this.props.isEditingTask &&
          <div className="modalFields">
            <h2>Edit Task</h2>
            <div>
              <span>Task Name</span>
              <input type="text" id="taskName"
                defaultValue={this.props.projects[this.props.selectedProject].boards[this.props.selectedBoard].tasks[this.props.selectedTask].name} />
            </div>
            <div>
              <span>Due date</span>
              <input type="date" id="taskDueDate"
                defaultValue={this.props.projects[this.props.selectedProject].boards[this.props.selectedBoard].tasks[this.props.selectedTask].dueDate} />
            </div>
          </div>
        }
        <div className="modalActions">
          <button onClick={this.onHandleSubmit}>Save</button>
          <button onClick={this.props.handleCloseTaskModal}>Close</button>
        </div>
      </Modal>
    );
  }
}
