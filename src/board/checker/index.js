import React from 'react';
import styled from 'styled-components';

export default (props) => {

    const CheckerItem = styled.span`
        width: 60%;
        height: 60%;
        border-radius: 100%;        
    `;

    const WhiteChecker = styled(CheckerItem)`
        background-color: gray;
    `;

    const BlackChecker = styled(CheckerItem)`
        background-color: black;
    `;

    return (
        <React.Fragment>
            {props.color === 'white' ? <WhiteChecker /> : <BlackChecker />}
        </React.Fragment>
    );
}
