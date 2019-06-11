import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestore} from "../api/firebase";
import {selectGame} from '../store/actions/games';

const ListGames = (props) => {

    const [list, setGamesList] = useState([]);

    useEffect(() => {
        /**** On game selected ****/
        const currentGameSubscribe = firestore.collection("users").doc(props.user.email)
           .onSnapshot(data => {
               const id = data.data().currentGame ? data.data().currentGame : null;
               props.selectGame(id);
       });

        /**** Listen on new games ****/
        const listGamesSubscribe = firestore.collection("games").onSnapshot(data => {
            const gamesList = data.docs.map(item => {
                return {id:item.id, data: item.data()}
            });
            setGamesList(gamesList);
        });


        /**** Unsubscribe on unmounting ****/
        return () => {
            currentGameSubscribe();
            listGamesSubscribe();
        };
    }, //eslint-disable-next-line
        []);


    return (
        <React.Fragment>
            <h4 className="my-3">Dostępne gry: </h4>
            <hr />
            <ListGroup className="d-flex justify-content-center">
                {list.map( item => {
                    const path = "/game/" + item.id;
                    return <Link key={item.id} to={path} >
                            <ListGroup.Item className="text-center">{item.data.title}</ListGroup.Item>
                           </Link>
                })}
            </ListGroup>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
        user: state.user,
        currentGame: state.currentGame
  };
};

ListGames.propTypes = {
    user: PropTypes.shape({
       email: PropTypes.string,
       isLoggedIn: PropTypes.bool,
       initial: PropTypes.bool
    }),
    currentGame: PropTypes.shape({
        id: PropTypes.string,
        playerIds: PropTypes.object,
        gameState: PropTypes.object
    })
}


export default connect(mapStateToProps, {selectGame})(ListGames);