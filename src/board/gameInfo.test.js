import React from 'react';
import {act} from 'react-dom/test-utils';
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

    it('should render modal on game end', () => {
        const component = shallow(<GameInfo message={"Wygrały białe"} isEnded={true} />);
        expect(component.find('InfoModal').props().show).toBe(true);

        act(() => {
            component.find('InfoModal').props().onClose();
        });

        expect(component.find('InfoModal').props().show).toBe(false);
    });

});