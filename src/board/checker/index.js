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
         &:hover {
            outline: ${props => props.color === 'white' && '2px solid lightgray'};
         }
    `;

    const SelectedChecker = styled(CheckerItem)`
         outline: 2px solid black;
         background-color: ${props => props.color === 'black'? 'black' : 'lightgray'}
    `;

    const BlackChecker = styled(CheckerItem)`
        background-color: black;
        &:hover {
            outline: ${props => props.color === 'black' && '2px solid black'};
         }
    `;

    const handleClick = () => {
        if(props.status === props.color)
            props.selectChecker(props.col, props.row);
    }

    return (
        <React.Fragment>
            {props.color === 'white' ? props.selected ? <SelectedChecker color={props.color} /> : <WhiteChecker onClick={handleClick} color={props.status} /> :
                props.selected ? <SelectedChecker color={props.color} /> : <BlackChecker onClick={handleClick} color={props.status} />}
        </React.Fragment>
    );
}

export default connect(null, {selectChecker})(Checker);