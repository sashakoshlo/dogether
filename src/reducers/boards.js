import { loadState } from '../localStorage';

const boardsReducerInitialState = loadState() ? loadState().boards : [];

export default (state = boardsReducerInitialState, action) => {
  switch (action.type) {
    case 'ADD_BOARD':
      return [
        ...state,
        action.board,
      ];
    case 'EDIT_BOARD':
      return state.map((board) => {
        if (board.id === action.id) {
          return {
            ...board,
            ...action.updates,
          };
        }
        return board;
      });
    case 'REMOVE_BOARD':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
