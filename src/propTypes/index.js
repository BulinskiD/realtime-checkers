import PropTypes from "prop-types";

export const currentGameType = PropTypes.shape({
  id: PropTypes.string,
  players: PropTypes.array,
  status: PropTypes.string,
  nextMove: PropTypes.bool,
  checkersPosition: PropTypes.array,
  activePoles: PropTypes.array,
  selectedChecker: PropTypes.object,
  from: PropTypes.object
});

export const userType = PropTypes.shape({
  email: PropTypes.string,
  active: PropTypes.bool,
  initial: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  error: PropTypes.string,
  gameID: PropTypes.string
});

const polePropsType = PropTypes.shape({
  selected: PropTypes.bool,
  col: PropTypes.number,
  row: PropTypes.number,
  color: PropTypes.string
});

export const poleType = {
  currentGame: currentGameType,
  pole: polePropsType,
  active: PropTypes.bool,
  col: PropTypes.number,
  row: PropTypes.number,
  isActiveTurn: PropTypes.bool,
  selectChecker: PropTypes.func,
  setActivePoles: PropTypes.func
};
