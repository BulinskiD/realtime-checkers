import styled from "styled-components";

export const ChatContainer = styled.div`
  margin-top: 5vh;
  height: 40vh;
  overflow-y: scroll;
`;

export const Message = styled.div`
  width: 100%;
  background-color: ${props => (props.isActive ? "red" : "blue")};
  padding-top: 5%;
  padding-bottom: 5%;
`;
