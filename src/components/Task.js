import React from 'react';
import { connect } from 'react-redux';
import { editTask, removeTask } from '../actions/tasks';
import { selectTask } from '../actions/filters/selected';
import { openModal } from '../actions/ui';
import moment from 'moment';

class Task extends React.Component {
  state = {
    editingStatus: false
  }
  onHandleEditTask = () => {
    this.props.dispatch(selectTask(this.props.task));
    this.props.dispatch(openModal());
  }

  onHandleDeleteTask = () => {
    this.props.dispatch(removeTask(this.props.task.id));
  }

  onHandleChangeStatus = () => {
    this.setState(() => ({ editingStatus: true }));
  }

  onHandleSaveStatus = (e) => {
    this.props.dispatch(editTask(this.props.task.id, { status: e.target.value }));
    this.setState(() => ({ editingStatus: false }));
  }
  render = () => {
    return (
      <div className="task col-12 col-sm-10 col-lg-3">
        <div className="task-header row">
          <p className="col">{this.props.task.name}</p>
          <div className="col-auto">
            <button onClick={this.onHandleEditTask}><i className="fas fa-pencil-alt"></i></button>
            <button onClick={this.onHandleDeleteTask}><i className="fas fa-trash"></i></button>
          </div>
        </div>
        <p className="row">Due: {moment(this.props.task.dueDate).format('DD/MM/YYYY')}</p>
        <p className="row">Priority: {this.props.task.priority}</p>
        {!this.state.editingStatus &&
          <div onClick={this.onHandleChangeStatus} className="taskStatus row align-items-center">
            <p className="col-auto">{this.props.task.status}</p>
            <i className="fas fa-pencil-alt col-auto"></i>
          </div>
        }
        {this.state.editingStatus &&
          <div className="taskStatus row align-items-center">
            <select
              value={this.props.task.status}
              name="statuses"
              id="statusDropdown"
              autoFocus
              onChange={this.onHandleSaveStatus}
              className="col"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        }
      </div>
    )
  }
}

export default connect()(Task);
