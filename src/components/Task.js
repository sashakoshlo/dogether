import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { editTask, removeTask } from "../actions/tasks";
import { selectTask } from "../actions/filters/selected";
import { openModal } from "../actions/ui";

class Task extends React.Component {
  state = {
    editingStatus: false,
  };

  handleEditTask = () => {
    const { dispatch, task } = this.props;
    dispatch(selectTask(task));
    dispatch(openModal());
  };

  handleDeleteTask = () => {
    const { dispatch, task } = this.props;
    if (confirm("Delete this task?")) {
      dispatch(removeTask(task.id));
    }
  };

  handleChangeStatus = () => {
    this.setState(() => ({ editingStatus: true }));
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleChangeStatus();
    }
  };

  handleSaveStatus = (e) => {
    const { dispatch, task } = this.props;
    dispatch(editTask(task.id, { status: e.target.value }));
    this.setState(() => ({ editingStatus: false }));
  };

  handleCancelStatusChange = () => {
    this.setState(() => ({ editingStatus: false }));
  };

  render = () => {
    const { task } = this.props;
    const { editingStatus } = this.state;
    return (
      <div className="task col-11 col-sm-10 col-lg-5 col-xl-3">
        <div className="task-header row">
          <h3 className="col">{task.name}</h3>
          <div className="col-auto task-header__buttons-container">
            <button type="button" onClick={this.handleEditTask}>
              <i className="fas fa-pencil-alt" />
            </button>
            <button type="button" onClick={this.handleDeleteTask}>
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
        <p className="row">
          Due:
          {moment(task.dueDate).format("DD/MM/YYYY")}
        </p>
        <p className="row">
          Priority:
          {task.priority}
        </p>
        {!editingStatus && (
          <div
            role="button"
            tabIndex="0"
            onKeyPress={this.handleKeyPress}
            onClick={this.handleChangeStatus}
            className="task-status row align-items-center"
          >
            <p className="col-auto">{task.status}</p>
            <i className="fas fa-pencil-alt col-auto" />
          </div>
        )}
        {editingStatus && (
          <div className="task-status row align-items-center">
            <select
              value={task.status}
              name="statuses"
              id="statusDropdown"
              autoFocus
              onChange={this.handleSaveStatus}
              onBlur={this.handleCancelStatusChange}
              className="col-auto"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
      </div>
    );
  };
}

export default connect()(Task);
