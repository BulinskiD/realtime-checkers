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
})