import React from 'react';
import {act} from 'react-dom/test-utils';
import GameInfo from './gameInfo';
import {shallow, mount} from 'enzyme';

//TODO Mock getStatus function!!
describe("GameInfo", () => {

    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    it('should match snapshot for given props', () => {
        expect(shallow(<GameInfo status={'white'} />)).toMatchSnapshot();
    });

    it('should render modal on game end', () => {
        expect(shallow(<GameInfo status={'black'} />)).toMatchSnapshot();
    });

    it('should render modal on game end', () => {
        const component = mount(<GameInfo status={"WHITE_WINNER"} />);
        expect(component.find('InfoModal').props().show).toBe(true);
        act(() => {
            component.find('InfoModal').props().onClose();
            component.setProps();
        });
        expect(component.find('InfoModal').props().show).toBe(false);
    });

});