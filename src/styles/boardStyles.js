import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PlayersManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25%;
`;

export const PlayerHolderTitle = styled.h4`
  font-size: 1.4em;
  font-weight: 300;
`;

export const PlayerHolder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  padding-top: 10%;
  padding-bottom: 10%;
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid lightgray;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.15);
`;

export const PlayerItem = styled.span`
  padding: 5%;
  background-color: ${props =>
    props.active ? "#cc3300" : "rgba(204, 51, 0, .4)"};
  color: white;
  position: relative;
  border: 2px rgb(1, 37, 96, 0.5) solid;
  &:not(:first-child) {
    margin-top: 5%;
  }

  &::after {
    position: absolute;
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    display: block;
    content: " ";
    width: 10px;
    height: 10px;
    background-color: ${props => props.color};
  }
`;

export const BoardContainer = styled.div`
  height: 80vh;
  width: 80vh;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  justify-items: stretch;
`;

const CheckerItem = styled.span`
  width: 60%;
  height: 60%;
  border-radius: 100%;
  outline-offset: 6px;
  transition: all 0.2s;
  position: relative;
`;

export const ColorChecker = styled(CheckerItem)`
  background-image: ${props =>
    props.color === "white"
      ? "radial-gradient(lightgray, gray)"
      : "radial-gradient(#333, black)"};
  ${props =>
    props.isKing &&
    css`
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        content: "";
        width: 20px;
        height: 20px;
        background: tomato;
      }
    `}
  ${props =>
    props.nextMove &&
    props.hover &&
    css`
      &:hover {
        outline: 2px solid
          ${props => (props.color === "white" ? "lightgray" : "black")};
      }
    `}
`;

export const SelectedChecker = styled(CheckerItem)`
  outline: 2px solid
    ${props => (props.color === "black" ? "black" : "lightgray")};
  background-color: ${props =>
    props.color === "black" ? "black" : "lightgray"};
  ${props =>
    props.isKing &&
    css`
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        content: "";
        width: 20px;
        height: 20px;
        background: tomato;
      }
    `}
`;

export const PoleContainer = styled.div`
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    (props.col % 2 === 0 && props.row % 2 === 0) ||
    (props.col % 2 === 1 && props.row % 2 === 1)
      ? "#993300"
      : "#ffffcc"};
`;

export const ActivePlace = styled.div`
  background-color: red;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

export const TimeIndicator = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(204, 51, 0, 0.4),
    rgba(204, 51, 0, 1)
  );
  height: 3vh;
  width: ${props => props.percentage}px;
`;
