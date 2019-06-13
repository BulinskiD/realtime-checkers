import styled, {css} from "styled-components";

export const BoardContainer = styled.div`
        margin: 0 auto;
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
    `;

export const ColorChecker = styled(CheckerItem)`
        background-color: ${props => props.color === 'white' ? 'lightgray' : 'black'};
        ${props => (props.nextMove && props.hover) && css`
           &:hover {
            outline: 2px solid ${props => props.color === 'white' ? 'lightgray' : 'black'};
            }
        `}
    `;

export const SelectedChecker = styled(CheckerItem)`
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