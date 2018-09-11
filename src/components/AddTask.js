import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/ui';
import { selectBoard, selectTask } from '../actions/filters/selected';
import TaskModal from "./TaskModal";

class AddTask extends React.Component {
  onHandleOpenModal = () => {
    this.props.dispatch(selectBoard(this.props.boardId));
    this.props.dispatch(selectTask());
    this.props.dispatch(openModal());
  }
  render = () => {
    return (
      <div className="addTask">
        <button onClick={this.onHandleOpenModal}>+ New Task</button>
        {this.props.modalIsOpen && <TaskModal />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.ui.modalIsOpen
});

export default connect(mapStateToProps)(AddTask);
