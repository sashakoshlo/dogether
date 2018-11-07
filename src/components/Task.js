import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { editTask, removeTask } from "../actions/tasks";
import { selectTask } from "../actions/filters/selected";
import { openModal } from "../actions/ui";

class Task extends React.Component {
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

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleChangeStatus();
    }
  };

  handleSaveStatus = (e) => {
    const { dispatch, task } = this.props;
    dispatch(editTask(task.id, { status: e.target.value }));
  };

  render = () => {
    const { task } = this.props;
    return (
      <div className="task col-11 col-sm-10 col-lg-5 col-xl-3">
        <div className="task-header row align-items-start">
          <h3 className="col">{task.name}</h3>
          <div className="col-3 col-md-2 col-lg-auto row task-header__buttons-container justify-content-between">
            <button type="button" className="col-auto" onClick={this.handleEditTask}>
              <i className="fas fa-pencil-alt" />
            </button>
            <button type="button" className="col-auto" onClick={this.handleDeleteTask}>
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
        <p className="row">
          Due: {moment(task.dueDate).format("DD/MM/YYYY")}
        </p>
        <p className="row">
          Priority: {task.priority}
        </p>
        <div className="task-status row align-items-center">
          <select
            value={task.status}
            name="statuses"
            id="statusDropdown"
            onChange={this.handleSaveStatus}
            onBlur={this.handleCancelStatusChange}
            className="col-auto custom-select task-status__dropdown"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
    );
  };
}

export default connect()(Task);
