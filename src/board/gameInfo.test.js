import React from 'react';
import GameInfo from './gameInfo';
import {shallow} from 'enzyme';

describe("GameInfo", () => {

    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    it('should match snapshot for given props', () => {
        expect(shallow(<GameInfo message={"Grają białe"} isEnded={false} />)).toMatchSnapshot();
    });

    it('should render modal on game end', () => {
        expect(shallow(<GameInfo message={"Wygrały białe"} isEnded={true} />)).toMatchSnapshot();
    });

});