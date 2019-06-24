import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Navigation = styled(Nav)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 2%;
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
`;
