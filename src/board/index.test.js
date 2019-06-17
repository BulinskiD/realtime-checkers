import React from 'react';
import ConnectedBoard, { Board } from './index';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import startGame from '../utils/startGame';
import {Provider} from 'react-redux';
import {firestore} from "../api/firebase";
import getActivePoles from '../utils/getActivePoles';

jest.mock('../utils/getActivePoles');
jest.mock('../api/firebase');
const item = {id: '22', data: ()=> data};
const unsubscriber = jest.fn();
const onSnapshot = jest.fn(func => {func(item); return unsubscriber});
const doc = jest.fn();
firestore.collection = jest.fn();
firestore.collection.mockReturnValue({doc});
doc.mockReturnValue({onSnapshot});


jest.mock('../utils/startGame');
const setNewGameState = jest.fn();
const setActivePoles = jest.fn();
const selectGame = jest.fn();

const mockStore = configureMockStore();

let data;
getActivePoles.mockReturnValue({availablePoles: {col: 2, row: 2}});

describe('Board', () => {
    beforeEach(() => {
        setNewGameState.mockClear();
        setActivePoles.mockClear();
        selectGame.mockClear();
        unsubscriber.mockClear();
        data = {currentGame: {status: 'white', selectedChecker: {col: 2, row: 2},
            checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false}};
    });

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

    it("should call firestore subscribe on component load", () => {
        const store = mockStore(data);
        const props = {...data, setNewGameState, selectGame, setActivePoles, match: {params: {id: '22'}}};

        mount(<Provider store={store}><Board {...props} /></Provider>);

        expect(selectGame).toHaveBeenCalledWith('22');
        expect(setNewGameState).toHaveBeenCalledWith('22', data);
    });

    it("should unsubscribe on component unmount", () => {
        const store = mockStore(data);
        const props = {...data, setNewGameState, selectGame, setActivePoles, match: {params: {id: '22'}}};
        const component = mount(<Provider store={store}><Board {...props} /></Provider>);

        component.unmount();
        expect(unsubscriber).toHaveBeenCalledTimes(1);
    });

    it("should call setActivePoles when selectedChecker changes", () => {
        const store = mockStore(data);
        const props = {...data, setNewGameState, selectGame, setActivePoles, match: {params: {id: '22'}}};
        mount(<Provider store={store}><Board {...props} /></Provider>);

        expect(setActivePoles).toBeCalledWith({col: 2, row: 2});
    });

    it("shouldn't call setActivePoles when selectedChecker is null", () => {
        const store = mockStore(data);
        data.currentGame.selectedChecker = null;
        const props = {...data, setNewGameState, selectGame, setActivePoles, match: {params: {id: '22'}}};
        mount(<Provider store={store}><Board {...props} /></Provider>);

        expect(setActivePoles).toBeCalledTimes(0);
    });
});


describe('MapStateToProps', () => {
   it("should correctly map state to props", () => {

       const store = mockStore({currentGame: {status: 'white', selectedChecker: {},
               checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false}});

       const board = shallow(<ConnectedBoard store={store} />);

       expect(board.find('Board').props().currentGame).toStrictEqual({status: 'white', selectedChecker: {},
          checkersPosition: [{col: 2, row: 2, color: 'black', selected: false}], nextMove: false});
   });
});