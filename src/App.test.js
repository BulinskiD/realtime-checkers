import React from 'react';
import ConnectedApp, {App} from './App';
import Login from './auth';
import configureMockedStore from 'redux-mock-store';
import Authenticated from './shared/authenticated';
import ListGames from './list-games';
import Board from './board';
import {shallow, mount} from 'enzyme';


const onUserAuthChange = jest.fn();
let props;
const mockedStore = configureMockedStore();

describe("App", () => {
    beforeEach(() => {
        props = {authenticated: true, loading: false, onUserAuthChange};
        onUserAuthChange.mockClear();
    });

   it('Should render correct routes when loading is false', () => {
       const component = shallow(<App {...props} />);
       const listGamesFunc = component.find('Route').at(0).props().component();
       expect(listGamesFunc).toStrictEqual(<Authenticated authenticated={true} display={<ListGames />} />);

       const boardFunc = component.find('Route').at(1).props().component();
       expect(boardFunc).toStrictEqual(<Authenticated authenticated={true} display={<Board />} />);


       const comp = component.find('Route').at(2).props().component();
       expect(comp).toStrictEqual(<Login />);

       expect(component).toMatchSnapshot();
   });

    it('Should render loading when loading prop is true', () => {
        props.loading = true;
        const component = shallow(<App {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Should call onUserAuthChange on load', () => {
        mount(<App {...props} />);
        expect(onUserAuthChange).toBeCalledTimes(1);
    });
});

describe('MapStateToProps', () => {
   it('Should map state to props correctly', () => {
      const store = mockedStore({user: {isLoggedIn: false, initial: false}});
      const component = shallow(<ConnectedApp store={store} />);
      expect(component.find('App').props().authenticated).toBe(false);
      expect(component.find('App').props().loading).toBe(false);
   });
});