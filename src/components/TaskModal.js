import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { addTask, editTask } from '../actions/tasks';
import { closeModal } from '../actions/ui';

class TaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.selectedTask.id ? props.selectedTask.name : '',
      dueDate: props.selectedTask.id ? moment(props.selectedTask.dueDate) : null,
      priority: props.selectedTask.id ? props.selectedTask.priority : 'Low',
      projectId: props.selectedProject.id,
      calendarFocused: false,
      error: ''
    }
  };

  onHandleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onHandleDateChange = (dueDate) => {
    if (dueDate) {
      this.setState(() => ({ dueDate }));
    }
  }

  onHandlePriorityChange = (e) => {
    const priority = e.target.value;
    this.setState(() => ({ priority }));
  };

  onHandleCloseModal = () => {
    this.props.dispatch(closeModal());
  };

  onHandleSubmit = () => {
    if (!this.state.name) {
      this.setState(() => ({ error: 'Please provide a valid task name' }));
    } else if (!this.state.dueDate) {
      this.setState(() => ({ error: 'Please provide a valid due date' }));
    } else if (!this.state.priority) {
      this.setState(() => ({ error: 'Please provide a valid priority' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      const task = {
        name: this.state.name,
        dueDate: this.state.dueDate.valueOf(),
        priority: this.state.priority,
        projectId: this.state.projectId
      }
      console.log(task);
      if (this.props.selectedTask.id) {
        this.props.dispatch(editTask(this.props.selectedTask.id, task));
      } else {
        this.props.dispatch(addTask(task));
      }
      this.onHandleCloseModal();
    }
  };

  render = () => {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.onHandleCloseModal}
        contentLabel="Task"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="Modal col-12 col-sm-10 col-lg-3"
        overlayClassName="Overlay"
      >
        {this.state.error && <p>{this.state.error}</p>}
        <div className="modalHeader row">
          {Object.keys(this.props.selectedTask).length ? <h3 className="col">Edit Task</h3> : <h3 className="col">Create Task</h3>}
        </div>
        <div className="modalFields">
          <div className="row align-items-center">
            <span className="col-4">Task Name</span>
            <input
              type="text"
              id="taskName"
              value={this.state.name}
              onChange={this.onHandleNameChange}
              autoFocus
              className="col"
            />
          </div>
          <div className="row align-items-center">
            <span className="col-4">Due Date</span>
            <div>
              <SingleDatePicker
                date={this.state.dueDate} // momentPropTypes.momentObj or null
                onDateChange={this.onHandleDateChange} // PropTypes.func.isRequired
                focused={this.state.calendarFocused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState(() => ({ calendarFocused: focused }))} // PropTypes.func.isRequired
                id="taskCalendar" // PropTypes.string.isRequired,
                numberOfMonths={1}
                hideKeyboardShortcutsPanel={true}
              />
            </div>
          </div>
          <div className="taskPriority row align-items-center">
            <span className="col-4">Priority</span>
            <select
              value={this.state.priority}
              name="priorities"
              id="priorityDropdown"
              onChange={this.onHandlePriorityChange}
              className="col-auto"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="modalActions row justify-content-end">
          <button onClick={this.onHandleSubmit}>Save</button>
          <button onClick={this.onHandleCloseModal}>Close</button>
        </div>
      </Modal>
    );
  };
};

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  selectedTask: state.selected.selectedTask,
  modalIsOpen: state.ui.modalIsOpen
});

export default connect(mapStateToProps)(TaskModal);
