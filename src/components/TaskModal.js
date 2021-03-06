import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { connect } from "react-redux";
import Modal from "react-modal";
import { addTask, editTask } from "../actions/tasks";
import { closeModal } from "../actions/ui";

class TaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.selectedTask.id ? props.selectedTask.name : "",
      dueDate: props.selectedTask.id ? moment(props.selectedTask.dueDate) : null,
      priority: props.selectedTask.id ? props.selectedTask.priority : "Low",
      projectId: props.selectedProject,
      calendarFocused: false,
      error: "",
    };
  }

  onHandleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onHandleDateChange = (dueDate) => {
    if (dueDate) {
      this.setState(() => ({ dueDate }));
    }
  };

  onHandlePriorityChange = (e) => {
    const priority = e.target.value;
    this.setState(() => ({ priority }));
  };

  onHandleCloseModal = () => {
    this.props.dispatch(closeModal());
  };

  onHandleSubmit = () => {
    if (!this.state.name) {
      this.setState(() => ({ error: "Please provide a valid task name" }));
    } else if (!this.state.dueDate) {
      this.setState(() => ({ error: "Please provide a valid due date" }));
    } else if (!this.state.priority) {
      this.setState(() => ({ error: "Please provide a valid priority" }));
    } else {
      this.setState(() => ({ error: "" }));
      const task = {
        name: this.state.name,
        dueDate: this.state.dueDate.valueOf(),
        priority: this.state.priority,
        projectId: this.state.projectId,
      };
      if (this.props.selectedTask.id) {
        this.props.dispatch(editTask(this.props.selectedTask.id, task));
      } else {
        this.props.dispatch(addTask(task));
      }
      this.onHandleCloseModal();
    }
  };

  render = () => (
    <Modal
      isOpen={this.props.modalIsOpen}
      onRequestClose={this.onHandleCloseModal}
      contentLabel="Task"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="task-modal col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3"
      overlayClassName="task-modal-overlay"
    >
      {this.state.error && <p className="task-modal__error row">{this.state.error}</p>}
      <div className="task-modal-header row">
        {Object.keys(this.props.selectedTask).length ? (
          <h3 className="col">Edit Task</h3>
        ) : (
          <h3 className="col">Create Task</h3>
        )}
      </div>
      <div className="task-modal-fields">
        <div className="row align-items-center">
          <span className="col-4">Task Name</span>
          <input
            type="text"
            id="taskName"
            value={this.state.name}
            onChange={this.onHandleNameChange}
            autoFocus
            className="col"
            placeholder="Enter name"
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
              hideKeyboardShortcutsPanel
              placeholder="Enter due date"
              readOnly
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
      <div className="modal-actions row justify-content-end">
        <button
          type="button"
          onClick={this.onHandleCloseModal}
          className="modal-actions__secondary"
        >
          Close
        </button>
        <button type="button" onClick={this.onHandleSubmit} className="modal-actions__primary">
          Save
        </button>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  selectedTask: state.selected.selectedTask,
  modalIsOpen: state.ui.modalIsOpen,
});

export default connect(mapStateToProps)(TaskModal);
