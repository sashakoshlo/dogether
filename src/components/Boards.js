import React from "react";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { connect } from "react-redux";

const Boards = ({ selectedProject, boards }) => (
  <div>
    <div className="projectHeader">
      <div className="projectTitle">
        <img src="./images/projecticon.png" alt="Project icon" />
        <h1>{selectedProject.name}</h1>
      </div>
      <div className="projectActions">
        <button>Show Closed tasks</button>
      </div>
    </div>
    <div className="boards">
      <div className="existingBoards">
        {boards.map(board => {
          if (board.projectId === selectedProject.id) {
            return <Board key={board.id} board={board} />
          }
        })}
      </div>
      <div>
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
