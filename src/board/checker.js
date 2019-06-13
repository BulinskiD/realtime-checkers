import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ColorChecker, SelectedChecker } from "./boardStyles";
import {selectChecker} from "../store/actions/checkers";

const Checker = (props) => {

    const handleClick = () => {
        if((props.status === props.color) && !props.nextMove)
            props.selectChecker(props.col, props.row);
    }

    return (
        <React.Fragment>
            {props.selected ? <SelectedChecker isKing={props.isKing} color={props.color} /> : <ColorChecker onClick={handleClick}
                                                                                                            color={props.color}
                                                                                                            hover={props.color === props.status}
                                                                                                            nextMove={!props.nextMove}
                                                                                                            isKing={props.isKing} />}
        </React.Fragment>
    );
}

const mapStateToProps = ({currentGame}) => {
    return {
        nextMove: currentGame.nextMove
    }
}

Checker.propTypes = {
    nextMove: PropTypes.bool,
    color: PropTypes.string,
    status: PropTypes.string,
    col: PropTypes.number,
    isKing: PropTypes.bool
}

export default connect(mapStateToProps, {selectChecker})(Checker);