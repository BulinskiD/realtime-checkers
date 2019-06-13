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
            {props.selected ? <SelectedChecker color={props.color} /> : <ColorChecker onClick={handleClick}
                                                                                      color={props.color}
                                                                                      hover={props.color === props.status}
                                                                                      nextMove={!props.nextMove}/>}
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
    col: PropTypes.number
}

export default connect(mapStateToProps, {selectChecker})(Checker);