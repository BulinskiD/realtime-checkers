import React from 'react';
import configureMockStore from 'redux-mock-store';
import ConnectedChecker, {Checker} from './checker';
import {shallow} from 'enzyme';

const store = configureMockStore();
const selectChecker = jest.fn();
const props = {nextMove: false, color: 'white', status: 'white', col: 1, row: 1, isKing: false, selected: true, selectChecker};


describe('Checker', () => {
   it('should render checker without event listener for given props', () => {
       const component = shallow(<Checker {...props} />);
       expect(component.find('.selected').props().onClick).toBe(undefined);
       expect(component).toMatchSnapshot();
   });

   it('should render checker with event listener for given props', () => {
       props.selected = false;
       const component = shallow(<Checker {...props} />)
       component.find('.color').simulate('click');
       expect(selectChecker).toHaveBeenCalledWith(1, 1);
       expect(component).toMatchSnapshot();
   });
});

describe('MapStateToProps', () => {
    it('should correctly map state to props', () => {
        const mockedStore = store({currentGame: {nextMove: false}});
        const component = shallow(<ConnectedChecker store={mockedStore} />);
        expect(component.find('Checker').props().nextMove).toBe(false);
    });
});