import React from 'react';
import { Board } from './index';
import { shallow } from 'enzyme';
import startGame from '../utils/startGame';

jest.mock('../utils/startGame');
const setNewGameState = jest.fn();
const setActivePoles = jest.fn();
const selectGame = jest.fn();

describe('Board', () => {
   it('should render 64 poles and Start game button for given props', () => {
        const selectedChecker = {col: 2, row: 2, color: 'black', selected: false};
        const currentGame = {status: 'not-started', selectedChecker, checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false};
        const props = {currentGame, setNewGameState, selectGame, setActivePoles};
        const component = shallow(<Board {...props} />);
        expect(component.find('Button').text()).toBe("Zacznij grę");
        expect(component.find('Connect(Pole)').length).toBe(64);
        expect(component).toMatchSnapshot();
   });

    it("shouldn't render Start game button for given props", () => {
        const selectedChecker = {col: 2, row: 2, color: 'black', selected: false};
        const currentGame = {status: 'white', selectedChecker, checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false};
        const props = {currentGame, setNewGameState, selectGame, setActivePoles};
        const component = shallow(<Board {...props} />);
        expect(component.find('Button').exists()).toBe(false);
        expect(component.find('Connect(Pole)').length).toBe(64);
        expect(component).toMatchSnapshot();
    });

    it("should call startGame on click on button", () => {
        const currentGame = {status: 'not-started', selectedChecker: {}, checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false};
        const props = {currentGame, setNewGameState, selectGame, setActivePoles};
        const component = shallow(<Board {...props} />);
        component.find('Button').simulate('click');

        expect(startGame).toBeCalledWith(currentGame);
    });

    //TODO Test useEffect hooks!
});