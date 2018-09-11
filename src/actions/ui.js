export const openModal = () => ({
  type: 'OPEN_MODAL',
  modalIsOpen: true
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
  modalIsOpen: false
});
