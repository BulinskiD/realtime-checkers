import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Checker from '../checker';
import getPole from '../../utils/getPole';

const Pole = props => {
    const PoleContainer = styled.div`
        border: solid 1px black;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const ActivePlace = styled.div`
        background-color: red;
        cursor: pointer;
    `;

    return (
      <PoleContainer>
          {props.pole && props.pole.length !== 0 && <Checker selected={props.pole[0].selected} col={props.pole[0].col} row={props.pole[0].row} color={props.pole[0].color} />}
      </PoleContainer>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {pole: getPole(ownProps.col, ownProps.row, state.currentGame)}
}

export default connect(mapStateToProps, null)(Pole);
