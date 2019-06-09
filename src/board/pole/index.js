import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Checker from '../checker';

const Pole = (props) => {
    const PoleContainer = styled.div`
        border: solid 1px black;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return (
      <PoleContainer>
          {props.pole.length === 1 && <Checker selected={props.pole[0].selected} col={props.pole[0].col} row={props.pole[0].row} color={props.pole[0].color} />}
      </PoleContainer>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        pole: state.currentGame.gameState.checkersPosition.filter(item => (item.col === ownProps.col && item.row === ownProps.row))
    }
}

export default connect(mapStateToProps, null)(Pole);
