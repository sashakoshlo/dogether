import React from 'react';
import { connect } from 'react-redux';
import { editTask, removeTask } from '../actions/tasks';
import { selectTask, selectBoard } from '../actions/filters/selected';
import { openModal } from '../actions/ui';
import moment from 'moment';

class Task extends React.Component {
  state = {
    editingStatus: false
  }
  onHandleEditTask = () => {
    this.props.dispatch(selectBoard(this.props.task.boardId));
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
      <div className="task">
        <div className="taskHeader">
          <p>{this.props.task.name}</p>
          <div className="taskHeaderActions">
            <button onClick={this.onHandleEditTask}><i className="fas fa-pencil-alt"></i></button>
            <button onClick={this.onHandleDeleteTask}><i className="fas fa-trash"></i></button>
          </div>
        </div>
        <p>Due: {moment(this.props.task.dueDate).format('DD/MM/YYYY')}</p>
        <p>Priority: {this.props.task.priority}</p>
        {!this.state.editingStatus &&
          <div onClick={this.onHandleChangeStatus} className="taskStatus">
            <p>{this.props.task.status}</p>
            <i className="fas fa-pencil-alt"></i>
          </div>
        }
        {this.state.editingStatus &&
          <div className="taskStatus">
            <select
              value={this.props.task.status}
              name="statuses"
              id="statusDropdown"
              autoFocus
              onChange={this.onHandleSaveStatus}
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

// const mapStateToProps = state = ({

// });

export default connect()(Task);
