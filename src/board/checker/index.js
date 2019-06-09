import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {selectChecker} from "../../store/actions/checkers";

const Checker = (props) => {

    const CheckerItem = styled.span`
        width: 60%;
        height: 60%;
        border-radius: 100%;   
        outline-offset: 6px;
        transition: all .2s;     
    `;

    const WhiteChecker = styled(CheckerItem)`
        background-color: lightgray;
    `;

    const SelectedChecker = styled(CheckerItem)`
         background-color: black;
         outline: 2px solid black;
    `;

    const BlackChecker = styled(CheckerItem)`
        background-color: black;
        &:hover {
            outline: 2px solid black;
         }
    `;

    const handleClick = (e) => {
        props.selectChecker(props.col, props.row);
    }

    return (
        <React.Fragment>
            {props.color === 'white' ? <WhiteChecker /> : props.selected ? <SelectedChecker /> : <BlackChecker onClick={handleClick} />}
        </React.Fragment>
    );
}

export default connect(null, {selectChecker})(Checker);