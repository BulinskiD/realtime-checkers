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
            {props.canActivateGame && (status === 'not-started' || status === WHITE_WINNER || status === BLACK_WINNER) &&
                <Button className='start-game' onClick={()=>startGame(props.currentGame, props.user)} variant='primary'>Zacznij grę</Button>}
            {props.gameAvailable && <Button onClick={()=>signUpToGame(props.user, props.gameID, players)} variant='primary'>Dołącz do gry</Button>}
            {players.map(item => {
               return <div key={item.email}>{item.email}</div>
            })}
        </React.Fragment>
    );
};

PlayersManager.propTypes = {
     currentGame: currentGameType,
     user: PropTypes.string,
     gameAvailable: PropTypes.bool,
     canActivateGame: PropTypes.bool,
     gameID: PropTypes.string
}


const mapStateToProps = (state) => {
    const {players} = state.currentGame;
  return {
      currentGame: state.currentGame,
      user: state.user.email,
      canActivateGame: players.length === 2 && players.filter(item => item.email === state.user.email && !item.started).length === 1,
      gameAvailable: (players.length !== 2) && (players.filter(({email}) => email === state.user.email).length === 0)
  }
};

export default connect(mapStateToProps, null)(PlayersManager);