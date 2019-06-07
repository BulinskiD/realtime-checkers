import React from  'react';
import styled from 'styled-components';

const Pole = (props) => {
    const PoleContainer = styled.div`
        border: solid 1px black;
    `
    
    return (
      <PoleContainer>
          {props.x}/{props.y}
      </PoleContainer>
    );
}

export default Pole;
