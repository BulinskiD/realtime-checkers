import styled, {css} from "styled-components";

export const FlexContainer = styled.div`
        display: flex;
        justify-content: space-between;
`;

export const PlayersManagerContainer = styled.div`
        display: flex;
        flex-direction: column;
    
`;

export const PlayerHolder = styled.div`
        display: flex;
        flex-direction: column;
        padding: 5%;
        padding-top: 10%;
        padding-bottom: 10%;
        background-color: rgba(0, 0, 0, .05);
        border-radius: 5%;
        border: 1px solid lightgray;
        box-shadow: 5px 5px 10px 0px rgba(0,0,0,.15);
`;

export const PlayerItem = styled.span`
        padding: 5%;
        background-color: #e2e283;
        color: white;
        border-radius: 5%;
        &:not(:first-child) {
          margin-top: 5%;
        }
`;

export const BoardContainer = styled.div`
        height: 90vh;
        width: 90vh;
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
        transition: all .2s;     
        position: relative;
    `;

export const ColorChecker = styled(CheckerItem)`
        background-color: ${props => props.color === 'white' ? 'lightgray' : 'black'};
        ${props => (props.isKing) && css`
            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: block;
                content: '';
                width: 20px;
                height: 20px;
                background: tomato;
            }
        `}
        ${props => (props.nextMove && props.hover) && css`
           &:hover {
            outline: 2px solid ${props => props.color === 'white' ? 'lightgray' : 'black'};
            }
        `}
    `;

export const SelectedChecker = styled(CheckerItem)`
        ${props => (props.isKing) && css`
            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: block;
                content: '';
                width: 20px;
                height: 20px;
                background: tomato;
            }
        `}
         outline: 2px solid black;
         background-color: ${props => props.color === 'black'? 'black' : 'lightgray'}
    `;

export const PoleContainer = styled.div`
        border: solid 1px black;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

export const ActivePlace = styled.div`
        background-color: red;
        cursor: pointer;
        width: 100%;
        height: 100%;
    `;