import React from 'react';
import { connect } from 'react-redux';
import { addBoard } from '../actions/boards';

class AddBoard extends React.Component {
  state = {
    editing: false
  }
  onHandleOpenEditForm = () => {
    this.setState(() => ({
      editing: true
    }));
  }
  onHandleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onHandleAddBoard();
    }
  }
  onHandleAddBoard = () => {
    const boardName = document.getElementById("boardName").value;
    if (boardName) {
      this.props.dispatch(addBoard(boardName, this.props.selectedProject.id));
    }
    this.setState(() => ({
      editing: false
    }));
  }
  render = () => {
    return (
      <div>
        {!this.state.editing && <button className="addBoardButton" onClick={this.onHandleOpenEditForm}>+ New Board</button>}
        {this.state.editing &&
          <div className="addBoard">
            <input
              type="text"
              autoFocus
              id="boardName"
              onKeyPress={this.onHandleKeyPress}
            />
            <button onClick={this.onHandleAddBoard}>Save</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject
});

export default connect(mapStateToProps)(AddBoard);
