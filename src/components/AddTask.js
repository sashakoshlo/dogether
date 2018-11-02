import React from "react";
import { connect } from "react-redux";
import { openModal } from "../actions/ui";
import { selectTask } from "../actions/filters/selected";
import TaskModal from "./TaskModal";

class AddTask extends React.Component {
  onHandleOpenModal = () => {
    this.props.dispatch(selectTask());
    this.props.dispatch(openModal());
  };

  render = () => (
    <div className="col">
      <button
        type="button"
        onClick={this.onHandleOpenModal}
        className="project-details-header__action col"
      >
        New Task
      </button>
      {this.props.modalIsOpen && <TaskModal />}
    </div>
  );
}

const mapStateToProps = state => ({
  modalIsOpen: state.ui.modalIsOpen,
});

export default connect(mapStateToProps)(AddTask);
