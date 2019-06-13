import styled, {css} from "styled-components";

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
