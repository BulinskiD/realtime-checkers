import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { firestore } from "../api/firebase";

const ListGames = () => {
  const [list, setGamesList] = useState([]);

  useEffect(
    () => {
      /**** Listen on new games ****/
      const listGamesSubscribe = firestore
        .collection("games")
        .onSnapshot(data => {
          const gamesList = data.docs.map(item => {
            return { id: item.id, data: item.data() };
          });
          setGamesList(gamesList);
        });

      /**** Unsubscribe on unmounting ****/
      return () => {
        listGamesSubscribe();
      };
    }, //eslint-disable-next-line
    []
  );

  return (
    <React.Fragment>
      <h4 className="my-3">Dostępne gry: </h4>
      <hr />
      <ListGroup className="d-flex justify-content-center">
        {list.map(item => {
          const path = "/game/" + item.id;
          return (
            <Link key={item.id} to={path}>
              <ListGroup.Item className="text-center">
                {item.data.title}
              </ListGroup.Item>
            </Link>
          );
        })}
      </ListGroup>
    </React.Fragment>
  );
};

export default ListGames;
