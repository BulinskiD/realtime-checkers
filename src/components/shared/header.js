import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navigation,
  NavigationContainer,
  NavLink,
  DropdownLink,
  Logo
} from "../../styles/headerStyles";
import NavDropdown from "react-bootstrap/NavDropdown";
import { userLogout } from "../../store/actions/auth";

export const Header = props => {
  return (
    <NavigationContainer className="mb-4" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>
          <Logo src="/images/logo.svg" className="img-fluid" alt="logo" />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navigation>
          <LinkContainer to="/">
            <NavLink>Aktywne gry</NavLink>
          </LinkContainer>
          <DropdownLink title={props.user} id="basic-nav-dropdown">
            <NavDropdown.Item>Profil</NavDropdown.Item>
            <NavDropdown.Item>Statystyki</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={props.userLogout}>
              Wyloguj
            </NavDropdown.Item>
          </DropdownLink>
        </Navigation>
      </Navbar.Collapse>
    </NavigationContainer>
  );
};

Header.propTypes = {
  user: PropTypes.string,
  userLogout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user.email
  };
};

export default connect(
  mapStateToProps,
  { userLogout }
)(Header);
