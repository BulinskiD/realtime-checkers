import styled from "styled-components";

export const ChatContainer = styled.div`
  margin-top: 5vh;
  height: 40vh;
  border: 1px solid black;
  background-color: white;
  overflow-y: scroll;
`;

export const Message = styled.div`
  position: relative;
  color: white;
  margin-right: ${props => (props.isActive ? 0 : "15px")};
  margin-left: ${props => (!props.isActive ? 0 : "15px")};
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 3%;
  background-color: ${props =>
    props.isActive ? "rgba(204, 51, 0, .4)" : "rgba(204, 51, 0, 1)"};
  padding: 0 30px 30px 30px;
  word-wrap: break-word;
`;

export const MessageAuthor = styled.div`
  position: absolute;
  bottom: 5px;
  right: 2px;
  font-size: 0.6em;
`;
