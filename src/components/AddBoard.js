import React from 'react';

export default class AddBoard extends React.Component {
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
      this.props.handleAddBoard(boardName);
    }
    this.setState(() => ({
      editing: false
    }));
  }
  render = () => {
    return (
      <div className="addBoard">
        {!this.state.editing && <button onClick={this.onHandleOpenEditForm}>+ New Board</button>}
        {this.state.editing && 
          <div>
            <input type="text" autoFocus id="boardName" onKeyPress={this.onHandleKeyPress}/>
            <button onClick = {this.onHandleAddBoard}>Save</button>
          </div>
        }
      </div>
    )
  }
}