import React from "react";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { connect } from "react-redux";

const Boards = ({ selectedProject, boards }) => (
  <div className="container-fluid">
    <div className="projectHeader row align-items-center">
      <div className="projectTitle col">
        <img src="./images/projecticon.png" alt="Project icon" />
        <h1>{selectedProject.name}</h1>
      </div>
      <div className="projectActions col-auto">
        <button>Show Closed tasks</button>
      </div>
    </div>
    <div className="boards row">
      <div className="boardsContainer col">
        <div className="existingBoards row">
          {boards.map(board => {
            if (board.projectId === selectedProject.id) {
              return <Board key={board.id} board={board} />
            }
          })}
        </div>
      </div>
      <div className="col-auto">
        <AddBoard />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  selectedProject: state.selected.selectedProject,
  boards: state.boards
});

export default connect(mapStateToProps)(Boards);
