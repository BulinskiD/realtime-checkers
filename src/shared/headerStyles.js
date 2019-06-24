import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Navigation = styled(Nav)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 12vh;
  border-bottom: 2px #444 solid;
  border-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.7),
      rgba(20, 20, 20, 0)
    )
    30 stretch;
`;

export const NavigationContainer = styled(Navbar)`
  background-color: #fafafa;
  height: 10vh;
`;

export const NavLink = styled(Nav.Link)`
  font-size: 1.2em;
  margin: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    outline: 2px solid #333;
  }
`;

export const DropdownLink = styled(NavDropdown)`
  font-size: 1.2em;
  margin: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    outline: 2px solid #333;
  }
`;

export const Logo = styled.img`
  margin-left: 10%;
  height: 8vh;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
