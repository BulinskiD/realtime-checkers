import styled from "styled-components";
import Form from "react-bootstrap/Form";
import media from "../../mediaQueries";

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  z-index: 2;
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.url});
  background-size: cover;
  z-index: 0;
`;

export const LoginFormElement = styled(Form)`
  width: 30%;
  padding: 3%;
  border: solid 1px #ddd;
  border-radius: 1%;
  background-color: #fafafa;
  box-shadow: 5px 7px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.5s;

  &:hover {
    transform: scale(1.04);
  }
  ${media.medium`
            width: 50%;
        `}
  ${media.small`
            width: 70%;
        `}
`;
