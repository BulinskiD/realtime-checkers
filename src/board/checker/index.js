import React from 'react';
import styled from 'styled-components';

export default (props) => {

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
            outline: 2px solid lightgray;
        }
    `;

    const BlackChecker = styled(CheckerItem)`
        background-color: black;
        &:hover {
            outline: 2px solid black;
         }
    `;

    return (
        <React.Fragment>
            {props.color === 'white' ? <WhiteChecker /> : <BlackChecker />}
        </React.Fragment>
    );
}
