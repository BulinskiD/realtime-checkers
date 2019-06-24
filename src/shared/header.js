import React from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Navigation, NavigationContainer } from "./headerStyles";
import NavDropdown from "react-bootstrap/NavDropdown";
import { userLogout } from "../store/actions/auth";

export const Header = props => {
  return (
    <NavigationContainer className="mb-4" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Checkers</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navigation>
          <LinkContainer to="/">
            <Nav.Link>Aktywne gry</Nav.Link>
          </LinkContainer>
          <NavDropdown title={props.user.email} id="basic-nav-dropdown">
            <NavDropdown.Item>Profil</NavDropdown.Item>
            <NavDropdown.Item>Statystyki</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={props.userLogout}>
              Wyloguj
            </NavDropdown.Item>
          </NavDropdown>
        </Navigation>
      </Navbar.Collapse>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { userLogout }
)(Header);
