import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { firestore } from "../api/firebase";
import NewGame from "./newGame";

const ListGames = props => {
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
    <Row>
      <Col xs={8}>
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
      </Col>
      <Col xs={4}>
        <NewGame history={props.history} />
      </Col>
    </Row>
  );
};

export default ListGames;
