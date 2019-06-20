import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {BLACK_WINNER, WHITE_WINNER} from "../store/constants/actionTypes";
import Button from "react-bootstrap/Button";
import startGame from "../utils/startGame";
import signUpToGame from "../utils/signUpToGame";
import {currentGameType} from "../propTypes";

export const PlayersManager = (props) => {
    const {status, players} = props.currentGame;

    return(
        <React.Fragment>
            {props.isParticipant && (status === 'not-started' || status === WHITE_WINNER || status === BLACK_WINNER) &&
                <Button className='start-game' onClick={()=>startGame(props.currentGame)} variant='primary'>Zacznij grę</Button>}
            {!props.isParticipant && props.gameAvailable && <Button onClick={()=>signUpToGame(props.user, props.gameID, players)} variant='primary'>Dołącz do gry</Button>}
        </React.Fragment>
    );
};

PlayersManager.propTypes = {
     currentGame: currentGameType,
     user: PropTypes.string,
     isParticipant: PropTypes.bool,
     gameAvailable: PropTypes.bool,
     gameID: PropTypes.string
}


const mapStateToProps = (state) => {
  return {
      currentGame: state.currentGame,
      user: state.user.email,
      isParticipant: (state.currentGame.players.filter(item => item === state.user.email).length === 1),
      gameAvailable: state.currentGame.players.length !== 2
  }
};

export default connect(mapStateToProps, null)(PlayersManager);