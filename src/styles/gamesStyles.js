import styled from "styled-components";
import Form from "react-bootstrap/Form";

export const NewGameForm = styled(Form)`
  height: ${props => (props.show ? "100%" : "0")};
  opacity: ${props => (props.show ? "1" : "0")};
  transition: all 0.5s;
`;
