const uiReducerDefaultState = {
  modalIsOpen: false
}

export default (state = uiReducerDefaultState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalIsOpen: action.modalIsOpen
      }
    default:
      return state;
  }
}
