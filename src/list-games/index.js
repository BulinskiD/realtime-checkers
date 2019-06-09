import React, {useEffect, useState} from 'react';
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
        <ListGroup>
            {list.map( item => {
                const path = "/game/" + item.id;
               return <ListGroup.Item><Link key={item.id} to={path} >{item.data.test}</Link></ListGroup.Item>
            })}
        </ListGroup>
    )
}

const mapStateToProps = (state) => {
  return {
        user: state.user,
        currentGame: state.currentGame
  };
};


export default connect(mapStateToProps, {selectGame})(ListGames);