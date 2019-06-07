import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Checker from '../checker';

const Index = (props) => {
    const PoleContainer = styled.div`
        border: solid 1px black;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const [checker, setChecker] = useState(false);

    useEffect(()=>{
        if(props.col % 2 === props.row % 2) {
            if (props.row <= 2)
                setChecker('white');
            else if (props.row >= 5)
                setChecker('black');
        }
    }, [props]);

    return (
      <PoleContainer>
          {checker && <Checker color={checker} />}
      </PoleContainer>
    );
}

export default Index;
